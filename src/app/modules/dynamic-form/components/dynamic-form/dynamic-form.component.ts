import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
  // tslint:disable: semicolon
  // tslint:disable: quotemark
} from "@angular/core";
import {
  UntypedFormGroup,
  AbstractControl,
  Validators,
  UntypedFormControl
} from "@angular/forms";

import { QuestionBase } from "../../models/question-base";
import { QuestionControlService } from "../../services/question-control.service";

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit,OnChanges {
  @Output() interactiveSubmit: EventEmitter<{}> = new EventEmitter();
  @Output() singleSubmit: EventEmitter<{}> = new EventEmitter();
  // the page could need to observe the form
  @Output() Form: EventEmitter<UntypedFormGroup> = new EventEmitter()
  @Output() changes:EventEmitter<SimpleChanges> = new EventEmitter()
  @Input() questions: QuestionBase<any>[] = [];
  @Input() submitText: string;
  @Input() hideSubmitButton:boolean
  /**TODO input async questions */

  form: UntypedFormGroup;
  payLoad: any

  constructor(private qcs: QuestionControlService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['questions']?.currentValue){
      this.formFactory()
    }
    this.changes.emit(changes)
  }

  formFactory(){
    this.form = this.qcs.toFormGroup(this.questions);
    this.form.valueChanges.subscribe(data =>{
      this.changes.emit(data)
    })
    if (this.questions?.filter(v => v.key === "location").length > 0) {
      this.form.addControl("address", new UntypedFormControl()); // input-geolocation usa un control in più
    }
    
    this.form.valueChanges.subscribe(v => {
      this.interactiveSubmit.emit(v);
    });
  }

  ngOnInit() {
    this.formFactory()
  }

  onSubmit() {
    this.payLoad = {}
    this.singleSubmit.emit(this.form.value);
  }
}
