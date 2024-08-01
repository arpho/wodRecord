import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: CodeGeneratorComponent
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: CodeGeneratorComponent
  }]
})
export class CodeGeneratorComponent implements OnInit,ControlValueAccessor,OnDestroy,Validator,OnDestroy {
  @Input() code:string=""
  @Input() generatorFunction:()=>Promise<string>
  @Input() validator:(control: AbstractControl)=> ValidationErrors;
  disabled: boolean;
  subscription:Subscription=Subscription.EMPTY
  touched = false;
  enablingCodeForm:UntypedFormGroup;
  private onChange: Function = (password: string) => { };
  // tslint:disable-next-line: ban-types
  private onTouch: Function = () => { };
  private onValidationChange: any = () => { };
  set value(code:string){
    this.code=code
  }
  get value(){
    return this.code
  }
  isValid(){
    return true
  }


  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }

  constructor(
    public formBuilder: UntypedFormBuilder
  ) { }
  validate(control: AbstractControl): ValidationErrors {
    return  this.validator(control)
  }
  ngOnDestroy(): void {
   this.subscription.unsubscribe()
  }
  writeValue(code: string): void {
   this.code=code
  }

  
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }


  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn
  }
  execute(){
    console.log("executing code")
    this.generatorFunction().then(code=>{
      this.enablingCodeForm.controls['code'].setValue(code)
    })
    this.enablingCodeForm.controls['code'].setValue(this.generatorFunction())  }

  ngOnInit() {
    console.log("genera code")
    this.enablingCodeForm= this.formBuilder.group({code:new UntypedFormControl(this.code)})
   this.subscription= this.enablingCodeForm.valueChanges.subscribe(d=>{
      this.markAsTouched()
      this.onChange(d.code)

    })
  }

}
