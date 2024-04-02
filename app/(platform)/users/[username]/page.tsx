export default function UserDetailsPage({params}: { params: { username: string;} }) {
    return (
        <div>
            <h1>UserDetailsPage {params.username}</h1>
        </div>
    )
}
