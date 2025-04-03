export function viewTime (value:string): string {
    const time = value.split("T")[1].slice(0,5)
    return time;
}