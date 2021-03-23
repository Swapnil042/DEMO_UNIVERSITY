export const checkCourseInput = (fields)=>{
    const idPattern = /^[0-9]*$/;
    let idError = null;

    if(!idPattern.test(fields.course_id) || fields.course_id === ''){
        idError = "Invalid Id";
    }

    let titleError = null;
    if(!fields.course_title.trim().length){
        titleError = "Invalid Title";
    }

    let descriptionError = null;
    if(!fields.course_description.trim().length){
        descriptionError = "Invalid Description";
    }

    let priceError = null;
    const pricePattern = /^(0|[1-9]\d*)(\.\d+)?$/;
    if(!pricePattern.test(fields.course_price)){
        priceError = "Price must be only numeric"
    }

    let ratingError = null;
    const ratingPattern = /^[1-5]$/;
    if(!ratingPattern.test(fields.course_rating)){
        ratingError = "Rating must be between 1-5"
    }

    let isValid = true;
    if(idError || titleError || descriptionError || priceError || ratingError){
        isValid = false;
    }

    return{
        isValid,idError,titleError,descriptionError,priceError,ratingError
    }
}

export const checkStudentInput = (fields)=>{
    const idPattern = /^[0-9]*$/;
    let idError = null;

    if(!idPattern.test(fields.student_id) || fields.student_id === ''){
        idError = "Invalid Id";
    }

    const phonePattern = /^[0-9]*$/;
    let phoneError = null;

    if(!phonePattern.test(fields.phone_number) || fields.phone_number === ''){
        phoneError = "Invalid Phone Number";
    }

    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let emailError = null

    if(!emailPattern.test(fields.email) || fields.email === ''){
        emailError = "Invalid Email";
    }

    let nameError = null;
    if(!fields.name.trim().length){
        nameError = "Invalid Name";
    }

    let universityError = null;
    if(!fields.university_name.trim().length){
        universityError = "Invalid University";
    }

    let addressError = null;
    if(!fields.address.trim().length){
        addressError = "Invalid Address";
    }

    let cityError = null;
    if(!fields.city.trim().length){
        cityError = "Invalid City";
    }

    let countryError = null;
    if(!fields.country.trim().length){
        countryError = "Invalid Country";
    }
    let gradeError = null;
    const gradePattern = /(^0?[1-9]$)|(^1[0-2]$)/;

    if(!gradePattern.test(fields.grade_level)){
        gradeError = "Grade Level must be between 1-12"
    }

    let isValid = true;
    if(idError || phoneError || nameError || universityError || addressError || cityError || countryError ||emailError || gradeError){
        isValid = false;
    }

    return{
        isValid, idError, phoneError, nameError, universityError, addressError, cityError, countryError, emailError, gradeError
    }
}

export const checkSignUpInput = (fields)=>{
    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let emailError = null

    if(!emailPattern.test(fields.email) || fields.email === ''){
        emailError = "Invalid Email";
    }

    let firstNameError = null;
    if(!fields.first_name.trim().length){
        firstNameError = "Invalid Name";
    }
    let lastNameError = null;
    if(!fields.last_name.trim().length){
        lastNameError = "Invalid Name";
    }
    let passError = null;
    if(fields.password.length < 7){
        passError = "At least 7 character";
    }
    
    let isValid = true;
    if(firstNameError|| lastNameError|| passError ||emailError){
        isValid = false;
    }
    return{ isValid, firstNameError, lastNameError, passError, emailError }
}