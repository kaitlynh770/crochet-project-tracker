export function Notes(props) {

  return (
    <div>
      <h2>
        Notes:
      </h2>
      {/* the font is different here, but these get saved as a bulleted list already, so there's no need to format.
       There shouldn't be any downsides to this since it's already accessible and SEO isn't a concern with user generated content.   */}
      <pre style={{ textAlign: 'left' }}>
        {props.notes}
      </pre>
    </div>
  )
}


