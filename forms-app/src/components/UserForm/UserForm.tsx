import { useFormik  } from "formik";
import * as Yup from 'yup';

interface FormValues {
    firstName: string;
    lastName: string;
    age: number;
    isEmployed: boolean;
    favoriteColor: string;
    sauces: string[];
    bestStooge: string;
    notes: string;
}

const COLORS = [
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

const BEST_STOOGE = [
    { name: 'Larry', value: 'larry' },
    { name: 'Curly', value: 'curly' },
    { name: 'Moe', value: 'moe' },
];

export default function UserForm() {
    // Defining inital data
    const initialValues: FormValues = {
        firstName: '',
        lastName: '',
        age: 0,
        isEmployed: false,
        favoriteColor: '',
        sauces: [],
        bestStooge: '',
        notes: '',
    }

    // Validations
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        age: Yup.number().required('Valid age is required'),
        isEmployed: Yup.boolean().required('Employment status is required'),
        favoriteColor: Yup.string().required('Favorite color is required'),
        sauces: Yup.array().required('Favorite sauces are required'),
        bestStooge: Yup.string().required('Best stooge is required'),
        notes: Yup.string(),
    });

    // Handling form submit
    const handleSubmit = (values: FormValues) => {
        console.log(JSON.stringify(values, null, 2));
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
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
            </div>

            <div>
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
            </div>

            <div>
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
            </div>

            <div>
                <label htmlFor="isEmployed">Employed</label>
                <input
                    id="isEmployed"
                    name="isEmployed"
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.isEmployed}
                />
            </div>

            <div>
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
                {formik.touched.favoriteColor && formik.errors.favoriteColor && (
                <div>{formik.errors.favoriteColor}</div>
                )}
            </div>

            <div>
                <label htmlFor="sauces">Sauces</label>
                {SAUCES.map((sauce) => (
                    <div key={sauce.value}>
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
                {formik.touched.sauces && formik.errors.sauces && (
                <div>{formik.errors.sauces}</div>
                )}
            </div>

            <div>
                {BEST_STOOGE.map((stooge) => (
                    <label key={stooge.value}>
                        <input
                            type="radio"
                            name="bestStooge"
                            value={stooge.value}
                            checked={formik.values.bestStooge === stooge.value}
                            onChange={formik.handleChange}
                        />
                        {stooge.name}
                    </label>
                ))}
                {formik.touched.bestStooge && formik.errors.bestStooge && <div>{formik.errors.bestStooge}</div>}
            </div>

            <div>
                <label htmlFor="notes">Notes</label>
                <textarea
                    id="notes"
                    name="notes"
                    placeholder="Notes"
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.notes && formik.errors.notes && <div>{formik.errors.notes}</div>}
            </div>

            <button type="submit">Submit</button>
            <button type="button" onClick={formik.handleReset}>Reset</button>
        </form>
    );
};