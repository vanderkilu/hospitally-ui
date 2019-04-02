import gql from 'graphql-tag'

export const LOCATIONS = gql`query AllLocations {
    locations {
        id,
        city,
    }
}`

export const HOSPITALSBYCITY = gql`query hospitals($city: String) {
    hospitalsByCity(city: $city) {
      id,
      name,
      photoUrl,
      status,
      contact
      location {
          latitude,
          longitude
      }
    }
}`

export const HOSPITAL = gql`query GetHospital($id: ID!) {
    hospital(id: $id) {
        id,
        name,
        photoUrl,
        status,
        contact,
        location {
            city,
            latitude,
            longitude
        },
        reviews {
            id,
            user {
                name
            }
            comment
        }
    }
}
`

export const SIGNUP = gql`mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
        token,
        user {
            id,
            name,
        }
    }
}
`

export const LOGIN = gql`mutation Login($email: String!, $password:String!) {
    login(email: $email, password: $password) {
        token,
        user {
            id,
            name
        }
    }
}
`