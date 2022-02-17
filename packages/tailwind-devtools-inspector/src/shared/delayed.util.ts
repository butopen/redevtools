export function delayed(action: () => void, time = 50) {
    setTimeout(action, time)
}
