import React from "react"
import ReactCountryFlag from "react-country-flag"

const Flags = () => {
    return (
        <div>
          <ReactCountryFlag
          className="emojiFlag"
          countryCode="FR"
          style={{
            fontSize: '6em',
            lineHeight: '2em',
          }}
          aria-label="United States"
          />
          <ReactCountryFlag
          className="emojiFlag"
          countryCode="GB"
          style={{
            fontSize: '6em',
            lineHeight: '2em',
          }}
          aria-label="United States"
          />

            <ReactCountryFlag countryCode="US" />

            <ReactCountryFlag countryCode="US" svg />

            <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                    width: '2em',
                    height: '2em',
                }}
                title="US"
            />

            <ReactCountryFlag
                countryCode="US"
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title="US"
            />
        </div>
    )
}

export default Flags
