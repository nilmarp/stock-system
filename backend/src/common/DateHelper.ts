export class DateHelper {
    private _date: Date

    constructor(date?: Date) {
        this._date = date ?? new Date;
    }

    set(date: Date) {
        this._date = date
        return this
    }

    addDays(days: number) {
        const date = new Date(this._date.valueOf())
        date.setDate(date.getDate() + days)
        this._date = date
        return this
    }

    get() {
        return this._date
    }    
}