import { Li } from "./ContactList.styled";

export function ContactList({ contacts, handleDeleteContact }) {
  return (
    <>
      <ul>
        {contacts.map((contact) => (
          <Li key={contact.id}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteContact(contact.id)}
            >
              Delete
            </button>
          </Li>
        ))}
      </ul>
    </>
  );
}
