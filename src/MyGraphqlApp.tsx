import React from 'react';
import './App.css';

import {
	gql, useQuery, useMutation
} from "@apollo/client";

const HELLO = gql `
{
  hello
}
`; 
const ME = gql `
{
  me { id name}
}
`; 
const USERS = gql `
{
  users { id name }
}
`; 
const DISPLAY = gql`
mutation SayHello($name: String) {
  sayHello(name: $name)
}
`;
function MyGraphqlApp() {
	const hello = useQuery(HELLO);
	const me = useQuery(ME);
	const users = useQuery(USERS);
	const [sayHello, { data, loading, error }] = useMutation(DISPLAY, {
		variables: {		  
		  name: "mr.abc",
		}});


	

	if(hello.loading || me.loading || users.loading || loading) return <div>Loading ... </div>
	if(hello.error || me.error || users.error) return <div>Error to access GraphQL server</div>
	return (
		<div className='container'>
			<div>
				<pre>{JSON.stringify(hello.data)}</pre>
			</div>
			<div>
				Greeting: Hello {hello.data.hello}
			</div>
			<div>
				ID: {me.data.me.id} NAME: {me.data.me.name}
			</div>
			<div>
				<pre>{JSON.stringify(users.data.users)}</pre>
			</div>
			<div>
				<pre>{JSON.stringify(data)}</pre>
			</div>
			<button onClick={()=>sayHello()}>
				test
			</button>
			<br/>
			

		</div>
	)

}
export default MyGraphqlApp;