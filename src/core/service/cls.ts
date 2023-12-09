export const cls = (...classes: (string | undefined)[]) => {
    return classes.filter(it => it !== undefined).join(' ')
}