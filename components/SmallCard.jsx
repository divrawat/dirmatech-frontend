import Link from 'next/link';
import { format } from 'date-fns';
 
const SmallCard = ({ blog }) => {
    const formattedDate = format(new Date(blog.date), 'dd MMMM, yyyy');
    return (
        <>
            <Link href={`/${blog.slug}`}>
                <section><img src={blog.photo} alt={blog.title} className='h-[200px] w-[350px] object-cover'/></section>
                <section className='text-center my-3 text-2xl font-bold'> {blog.title} </section>
            </Link>
            <section className='text-center px-2'>
                {formattedDate} &nbsp; by &nbsp;
                {blog.postedBy && blog.postedBy.name && blog.postedBy.username ? (
                    <Link className='hover:underline' href={`/profile/${blog.postedBy.username}`}>{blog.postedBy.name}</Link>) : (<span></span>)}
            </section>
            <br />
        </>
    );
};

export default SmallCard;