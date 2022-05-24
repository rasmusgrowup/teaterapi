import scss from '../styles/tekst.module.scss'

function Tekst({ overskrift, html, bg }) {
  const bgStyling = {
    backgroundColor: `${ bg ? `${bg}` : '' }`
  }

  const innerStyling = {
    paddingBottom: `${ bg ? `` : '3rem' }`,
    paddingTop: `${ bg ? `` : '3rem' }`
  }

  return (
    <>
      <section className={scss.wrapper} style={bgStyling}>
        <div className={scss.inner}>
          <h2>{overskrift}</h2>
          <div dangerouslySetInnerHTML={{ __html: `${html}` }}></div>
        </div>
      </section>
    </>
  )
}

Tekst.defaultProps = {
  overskrift: 'Overskrift',
  html: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>'
}

export default Tekst
