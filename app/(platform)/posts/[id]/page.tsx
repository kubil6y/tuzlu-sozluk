export default function PostDetailsPage({ params }: { params: { id: string } }) { 
    return (
        <div>
            <p>PostDetailsPage id: {params.id}</p>
        </div>
    )
}
