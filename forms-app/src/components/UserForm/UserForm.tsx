import { useFormik  } from "formik";
import * as Yup from 'yup';

import styles from './UserForm.module.css';

interface FormValues {
    firstName: string;
    lastName: string;
    age: number;
    employed: boolean;
    favoriteColor: string;
    sauces: string[];
    stooge: string;
    notes: string;
}

const COLORS = [
    { name: '', value: '' },
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Yellow', value: 'yellow' },
];

const SAUCES = [
    { name: 'Ketchup', value: 'ketchup' },
    { name: 'Mustard', value: 'mustard' },
    { name: 'Mayonnaise', value: 'mayonnaise' },
    { name: 'Guacamole', value: 'guacamole' },
];

const STOOGE = [
    { name: 'Larry', value: 'larry' },
    { name: 'Curly', value: 'curly' },
    { name: 'Moe', value: 'moe' },
];

const defaultTextAreaValue = {
    stooge: "larry",
    employed: false,
};

export default function UserForm() {

    // Defining inital data
    const initialValues: FormValues = {
        firstName: '',
        lastName: '',
        // age: NaN // shows the placeholder but in console displays an error
        age: 0,
        employed: false,
        favoriteColor: '',
        sauces: [],
        stooge: 'larry',
        notes: '',
    }

    // Validations
    const regexPattern: RegExp = /^[A-Za-z ]+$/;

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required').matches(regexPattern),
        lastName: Yup.string().required('Last name is required').matches(regexPattern),
        age: Yup.number().required('Valid age is required').positive().integer(),
        employed: Yup.boolean(),
        favoriteColor: Yup.string(),
        sauces: Yup.array(),
        stooge: Yup.string(),
        notes: Yup.string().max(100, 'Notes must be less than or equal to 100 characters'),
    });

    // Handling form submit
    const handleSubmit: (values: FormValues) => void = (values) => {
        // I decided to modify firstName and lastName to be lowercase for more practical uses in the future ex: analytics, insert into DB 
        const newValues: FormValues = { ...values, firstName: values.firstName.toLowerCase(), lastName: values.lastName.toLowerCase() };
        alert(JSON.stringify(newValues, null, 2));
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            
            {/* First Name */}
            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && <div>{formik.errors.firstName}</div>}


            {/* Last Name */}
            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && <div>{formik.errors.lastName}</div>}

            {/* Age */}
            <label htmlFor="age">Age</label>
            <input
                id="age"
                name="age"
                type="number"
                min={0}
                max={120}
                placeholder="Age"
                onChange={formik.handleChange}
                value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age && <div>{formik.errors.age}</div>}

            {/* Employed */}
            <label htmlFor="employed">Employed</label>
            <input
                id="employed"
                name="employed"
                type="checkbox"
                onChange={formik.handleChange}
                checked={formik.values.employed}
            />

            {/* Favorite Color */}
            <label htmlFor="favoriteColor">Favorite Color</label>
            <select
                id="favoriteColor"
                name="favoriteColor"
                value={formik.values.favoriteColor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                {COLORS.map((color) => <option key={color.value} value={color.value}>{color.name}</option>)}
            </select>

            {/* Sauces */}
            <label htmlFor="sauces">Sauces</label>
            <div>
                {SAUCES.map((sauce) => (
                    <div className={styles.my_05} key={sauce.value}>
                        <label>
                            <input
                            type="checkbox"
                            name="sauces"
                            value={sauce.value}
                            checked={formik.values.sauces.includes(sauce.value)}
                            onChange={formik.handleChange}
                            />
                            {sauce.name}
                        </label>
                    </div>
                ))}
            </div>

            {/* Stooge */}
            <label htmlFor="stooge">Best Stooge</label>
            <div>
                {STOOGE.map((stooge) => (
                    <div className={styles.my_05} key={stooge.value}>
                        <label>
                            <input
                                type="radio"
                                name="stooge"
                                value={stooge.value}
                                checked={formik.values.stooge === stooge.value}
                                onChange={formik.handleChange}
                            />
                            {stooge.name}
                        </label>
                    </div>
                ))}
            </div>

            {/* Notes */}
            <label htmlFor="notes">Notes</label>
            <textarea
                id="notes"
                name="notes"
                placeholder="Note"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.notes && formik.errors.notes && <div>{formik.errors.notes}</div>}
            
            <div className={styles.buttons_container}>
                { formik.values === formik.initialValues ? (<button className={styles.submit_inactive} disabled>Submit</button>) : (<button className={styles.submit_active} type="submit">Submit</button>) }
                { formik.values === formik.initialValues ? (<button className={styles.reset_inactive} type="button" disabled>Reset</button>) : (<button className={styles.reset_active} type="button" onClick={formik.handleReset}>Reset</button>) }
            </div>

            <textarea className={styles.displayJSON_textArea} rows={10} cols={50} readOnly value={
                formik.values === formik.initialValues ?
                JSON.stringify(defaultTextAreaValue, null, 2) :
                JSON.stringify(formik.values, null, 2)
            }  />
        </form>
    );
}