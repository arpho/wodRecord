import { BehaviorSubject, Observable, Subscription } from "rxjs";

export interface StringObservableMap{
    [key:string]:Observable<string>
}
export interface StringBehaviorSubjectMap{
    [key:string]:BehaviorSubject<string>
}