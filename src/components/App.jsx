import { useEffect, useState } from "react";
import { Wrapper } from "./App.styled";
import { ContactForm } from "./ContactForm/ContactForm";
import { nanoid } from "nanoid";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import phoneNumbers from "../data/phoneNumbers.json";
import { DellAlert } from "./DellAlert/DellAlert";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [delName, setDelName] = useState("");

  useEffect(() => {
    const localContacts = localStorage.getItem("contacts");

    if (localContacts) {
      setContacts(JSON.parse(localContacts));
    } else {
      setContacts(phoneNumbers);
    }
  }, []);

  useEffect(() => {
    console.log("Update");
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = ({ target }) => {
    setFilter(target.value);
  };

  const handleSubmit = (name, number) => {
    if (
      contacts.find(
        (contact) =>
          contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already in contacts!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts([...contacts, newContact]);
  };

  const getFilteredContacts = () =>
    contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

  const handleDeleteContact = (id) => {
    if (contacts.length !== 1) {
      setContacts(contacts.filter((contact) => contact.id !== id));
    } else {
      setContacts([]);
    }

    setDelName(contacts.find((contact) => contact.id === id).name);
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
      setDelName("");
    }, 2000);
  };
  return (
    <Wrapper>
      <h1>PhoneBook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleChange} />
      {deleted && <DellAlert>{delName}</DellAlert>}
      <ContactList
        contacts={getFilteredContacts()}
        handleDeleteContact={handleDeleteContact}
      />
    </Wrapper>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: "",
//     deleted: false,
//     delName: "",
//   };

//   componentDidMount() {
//     if (localStorage.getItem("contacts")) {
//       this.setState({ contacts: JSON.parse(localStorage.getItem("contacts")) });
//     } else {
//       this.setState({ contacts: [...phoneNumbers] });
//       localStorage.setItem("contacts", JSON.stringify(phoneNumbers));
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
//     if (prevState.contacts.length > this.state.contacts.length) {
//       setTimeout(() => this.setState({ deleted: false, delName: "" }), 2000);
//     }
//   }

//   handleChange = ({ target }) => {
//     this.setState({ [target.name]: target.value });
//   };

//   handleSubmit = (name, number) => {
//     if (
//       this.state.contacts.find(
//         (contact) =>
//           contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
//       )
//     ) {
//       alert(`${name} is already in contacts!`);
//       return;
//     }
//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.setState(({ contacts }) => ({ contacts: [...contacts, newContact] }));
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     return contacts.filter(({ name }) =>
//       name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
//     );
//   };

//   handleDeleteContact = (id) => {
//     const { contacts } = this.state;

//     this.setState({
//       contacts: contacts.filter((contact) => contact.id !== id),
//       deleted: true,
//       delName: contacts.find((contact) => contact.id === id).name,
//     });
//   };

//   render() {
//     return (
//       <Wrapper>
//         <h1>PhoneBook</h1>
//         <ContactForm onSubmit={this.handleSubmit} />
//         <h2>Contacts</h2>
//         <Filter filter={this.state.filter} onChange={this.handleChange} />
//         {this.state.deleted && <DellAlert>{this.state.delName}</DellAlert>}
//         <ContactList
//           contacts={this.getFilteredContacts()}
//           handleDeleteContact={this.handleDeleteContact}
//         />
//       </Wrapper>
//     );
//   }
// }
