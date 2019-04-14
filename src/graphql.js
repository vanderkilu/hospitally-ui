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
export const NEWLOCATION = gql`mutation NewLocation($address: String, $city: String!, 
$region: String!, $longitude:Float!, $latitude:Float!) {
    newLocation(address: $address, city: $city, 
    region:$region, longitude:$longitude, latitude: $latitude) {
        id
    }
}
`
export const NEWHOSPITAL = gql`mutation NewHospital($name: String!, $locationId: ID!,
    $website:String,$photoUrl:String,$status: String, $contact: String, $email: String) {
        newHospital(name: $name, locationId: $locationId, website:$website,
                    photoUrl: $photoUrl, status: $status, contact: $contact, email: $email) {
                        id
                    }
    }
`

export const NEWCHAT = gql`subscription NewChat {
    newChat{
        id,
        message,
        postedBy {
            id,
            name
        }
    }
}
`
export const CREATECHAT = gql`
mutation CreateChat($message: String!) {
    newChat(message: $message) {
        id,
        message,
        postedBy {
            id
        }
    }
}
`

export const USERS = gql` query Users {
    users {
        id, 
        name,
    }
}`