// Styling
import scss from '../styles/mailchimp.module.scss'

//Mailchimp module
import MailchimpSubscribe from "react-mailchimp-subscribe"

// a basic form
const CustomForm = ({ status, message, onValidated }) => {
  let email, fname, lname;
  const submit = () =>
    email &&
    fname &&
    lname &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      FNAME: fname.value,
      LNAME: lname.value
    });

  return (
    <div className={scss.form}>
      {status === "sending" && <div style={{ color: "blue" }}>Sender tilmelding ...</div>}
      {status === "error" && <div style={{ color: "red" }}>Der skete desværre en fejl. Prøv igen senere</div>}
      {status === "success" && <div style={{ color: "green" }}>Tusind tak for din tilmelding</div>}
      <input
        ref={node => (fname = node)}
        type="text"
        placeholder="Fornavn"
      />
      <input
        ref={node => (lname = node)}
        type="text"
        placeholder="Efternavn"
      />
      <input
        ref={node => (email = node)}
        type="email"
        placeholder="Email-adresse"
      />
      <br />
      <button onClick={submit}>
        Tilmeld dig
      </button>
    </div>
  );
};

export default function Mailchimp() {
  const url = 'https://gmail.us14.list-manage.com/subscribe?u=afa7bafb8da9deb3bd242c3f0&id=8b33abd27d'

  return (
    <>
      <section className={scss.wrapper}>
        <h2>Mailchimp</h2>
        <MailchimpSubscribe url={url} render={({ subscribe, status, message }) => (
          <div className={scss.container}>
            <CustomForm
              status={status}
              message={message}
              onValidated={formData => subscribe(formData)}
            />
          </div>
        )}/>
      </section>
    </>
  )
}
