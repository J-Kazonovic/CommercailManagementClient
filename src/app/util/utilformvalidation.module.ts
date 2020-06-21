export class UtilFormValidation{

    name=new RegExp('/^[a-z\d]{5,12}$/i');
    email=new RegExp('/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/');
    password=new RegExp('/^[#\w@_-]{8,20}$/');
    telephone=new RegExp('/^\d{11}$/');
    

    static validate(value:string,pattern:RegExp){
        return pattern.test(value);
    }

}