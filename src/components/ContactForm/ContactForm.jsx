import {useState} from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {Form, Label, Input, Button} from './ContactForm.styled'

const ContactForm = ({onSubmit}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameInputId = nanoid();
    const numberInputId = nanoid();

    const handleInputChange = (event) => {
        const { name, value } = event.currentTarget;
        if (name === 'name') {
            setName(value);
        } else if (name === 'number') {
            setNumber(value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit({ name, number });

        setName('');
        setNumber('');
    };
    
    return (
            <Form onSubmit={handleSubmit}>
                <Label>Name
                    <Input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={name}
                        onChange={handleInputChange}
                        id={nameInputId}
                    /></Label>
                <Label>Number
                    <Input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={number}
                        onChange={handleInputChange}
                        id={numberInputId}
                    /></Label>
                <Button type="submit">Add contact</Button>
            </Form>
    )
}

ContactForm.propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;