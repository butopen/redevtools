import { Suggester } from '../services/suggester';
import { loggedWritable } from '../shared/store.util';

export interface ClassesStore {
  classes: string[];
  focusedClass: string;
  lastText: string;
  suggestions: string[];
  activeSuggestion: string;
  focusedIndex: number;
}

export const classesStore = loggedWritable<ClassesStore>({
  classes: [],
  focusedClass: '',
  lastText: '',
  suggestions: [],
  activeSuggestion: '',
  focusedIndex: 0
});

export function updateFocusedClass(focusedClass: string) {
  classesStore.update({ focusedClass });
}

export function updateFocusedIndex(focusedIndex: number) {
  classesStore.update({ focusedIndex });
}

export function updateAddClass() {
  classesStore.update((s) => {
    const classes = [...s.classes, ''].map((c) => c.trim());
    return { classes, focusedClass: '', focusedIndex: Math.max(0, classes.length - 1) };
  });
}

export function updateRemoveClass() {
  classesStore.update((s) => {
    const classes = [...s.classes].filter((c) => c);
    const focusedClass = classes[classes.length - 1];
    return { classes, focusedClass, focusedIndex: Math.max(0, classes.length - 1) };
  });
}

export function updateClasses(classes: string[]) {
  const focusedClass = classes[0] || '';
  updateSuggestions(focusedClass, '');
  classesStore.update({ classes, focusedClass });
}

const suggester = new Suggester();

export function updateSuggestions(text: string, key: string) {
  classesStore.update((store) => {
    const textChanged = store.lastText == text;
    let activeClass = textChanged ? store.focusedClass : text;
    let suggestedClasses: string[] = [];
    const suggested = suggester.suggest(text);
    const leftOrRight = ['ArrowLeft', 'ArrowRight'].includes(key);
    if (suggested.length < 20) {
      suggestedClasses = suggested;
    } else {
      const activeIndexInSuggested = leftOrRight ? 0 : suggested.indexOf(activeClass);
      const from = Math.max(0, activeIndexInSuggested - 5);
      const to = Math.max(activeIndexInSuggested + 5, 10);
      suggestedClasses = suggested.slice(from, to);
    }

    const delta = key == 'ArrowUp' ? -1 : key == 'ArrowDown' ? 1 : 0;
    const activeIndex = suggestedClasses.indexOf(activeClass);
    if (suggestedClasses[activeIndex + delta]) {
      activeClass = suggestedClasses[activeIndex + delta];
      store.focusedClass = activeClass;
      store.classes[store.focusedIndex] = activeClass;
    }
    const activeSuggestion = activeClass;
    return {
      suggestions: suggestedClasses,
      activeSuggestion,
      focusedClass: textChanged ? text : store.focusedClass,
      lastText: text
    };
  });
}

export function updateActiveSuggestion(s: string) {
  classesStore.update({ activeSuggestion: s });
  updateSuggestions(s, '');
}
