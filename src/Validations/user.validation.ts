import * as yup from "yup";

const userNameValidation = yup.string().required("User Name is required.");
const emailValidation = yup.string().email("Invalid email format").required("Email is required.");
const passwordValidation = yup.string()
                            .min(4, "Password must be at least 4 characters")
                            .max(14, "Password must not exceed 14 characters")
                            .required("Password is required.")
                            .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,14}$/,
                            'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
                            )


export const userSignUpSchema = yup.object().shape({
    userName: userNameValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: passwordValidation.oneOf([yup.ref('password')], 'Passwords must match')
})

export const userLoginSchema = yup.object().shape({
    userName: userNameValidation,
    password: passwordValidation
})