import React from 'react'

export async function getServerSideProps(context) {
    const {params} = context;
    return {
        props: { id: params.id}
    }
}

const Description = (props) => {

  return (
    <div>
     {props.id}
    </div>
  )
}

export default Description
