export class RGBColor {

    RED: number = 0;
    GREEN: number = 0;
    BLUE: number = 0;

    constructor(colors: number[]) {
        this.RED = this.get(0, colors);
        this.GREEN = this.get(1, colors);
        this.BLUE = this.get(2, colors);
    }

    private get(index: number, array: number[]): number {
        let result = array[index];
        return result !== undefined ? result : 0;
    }

    getCSS(opacity?: number) {
        if(opacity === undefined) opacity = 1;
        return "rgb(" + this.RED + ", " + this.GREEN + ", " + this.BLUE + ", " + opacity + ")";
    }

}