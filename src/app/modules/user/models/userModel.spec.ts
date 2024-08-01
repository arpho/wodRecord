
  // tslint:disable: quotemark
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RoleModel } from "./privilegesLevelModel";
import { UserModel } from "./userModel";
import { DateModel } from "./birthDateModel";
const user = new UserModel();
const val = {
  email: "a@b.c",
  firstName: "joe",
  lastName: "friend",
  level: 1,
  expirationDate:"12/25/2022",
  birthDate: "03/16/1977",
  enabled: true
};
describe("test build function", () => {
  const Val = {
    email: "a@b.c",
    firstName: "joe",
    lastName: "friend",
    level: 1,
    expirationDate:"12/25/2022",
    birthDate: "3/16/1977",
    enabled: true
  };
  user.build(Val);
  it("the user is build correctly", () => {
    expect(user.firstName).toBe(val.firstName);
    expect(user.lastName).toBe(val.lastName);
    expect(user.email).toBe(val.email);
    expect(user.birthDate.day).toBe(16);
    expect(user.expirationDate).toBe("2022-12-25")
    expect(user.expirationTime).toBe(new Date(Val.expirationDate).getTime())
    expect(user.birthDate.month).toBe(2);
    expect(user.birthDate.year).toBe(1977);
    expect(user.level).toBe(1);
    expect(user.birthDate instanceof DateModel).toBeTruthy();
    // checkingf privileges level
    expect(user.role instanceof RoleModel).toBeTruthy();
    expect(user.role.key).toBe("Sviluppatore");
    expect(user.role.value).toBe(1);
  });

  it("user withouth expirationDate",()=>{
    const user =new UserModel()
    const today = new DateModel(new Date()).formatDate()
    expect(user.expirationDate).toBe(today)
  })
});
describe("serialize should work", () => {
  user.build(val);
  it("the user is serialized", () => {
    const serializedUser = user.serialize();
    expect(typeof serializedUser).toBe("object");
    expect(serializedUser.expirationDate).toBe("2022-12-25")
    expect(serializedUser.firstName).toBe(val.firstName);
    expect(serializedUser.lastName).toBe(val.lastName);
    expect(serializedUser.level).toBe(val.level);
    expect(serializedUser.birthDate.split('-')[0]).toBe('1977')
    expect(serializedUser.birthDate.split('-')[1]).toBe('03');
    expect(serializedUser.birthDate.split('-')[2].split('T')[0]).toBe('15');
  });
});
