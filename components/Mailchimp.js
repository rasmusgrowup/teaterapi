// Styling
import scss from '../styles/mailchimp.module.scss'

//Mailchimp module
import MailchimpSubscribe from "react-mailchimp-subscribe"

// a basic form
const CustomForm = ({ status, message, onValidated }) => {
  let email, fname;
  const submit = () =>
    email &&
    fname &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      FNAME: fname.value
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

export default function Mailchimp({ overskrift, html, url }) {
  return (
    <>
      <section className={scss.wrapper}>
        <h2>{overskrift}</h2>
        <div dangerouslySetInnerHTML={{ __html: `${html}` }}></div>
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
