import Link from 'next/link';


const Card = ({ blog }) => {

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <div key={i} className='bg-black text-[#89f379] m-3 hover:scale-105 transition-transform font-bold rounded py-2 px-3'> <Link href={`/categories/${c.slug}`}>{c.name}</Link></div>
        ))

    const formattedDate = blog.formattedDate;

    return (

        <div className="sm:w-[350px] my-8 mx-6 shadow-md sm:mx-auto rounded pb-8 border dark:bg-[#090a13] dark:text-white dark:border-none bg-white border-gray-300 hover:scale-105 transition-transform">
            <Link href={`/${blog.slug}`}></Link>
            <Link href={`/${blog.slug}`}><img src={blog.photo} alt={blog.title} className='h-[200px] w-[350px] object-cover' /></Link>
            <header><h2 className='text-center text-2xl py-5 font-bold px-2'><Link className='hover:underline' href={`/${blog.slug}`}>{blog.title}</Link></h2></header>
            <section className='text-center mb-5 px-2'>
                {formattedDate} &nbsp; by &nbsp;
                {blog.postedBy && blog.postedBy.name && blog.postedBy.username ? (
                    <Link className='hover:underline' href={`/profile/${blog.postedBy.username}`} > {blog.postedBy.name}</Link>) : (<span>User</span>)}
            </section>


            <div>
                <div className='flex flex-wrap justify-center'> {showBlogCategories(blog)}</div>
                {/* <div>{(blog.excerpt)}</div> */}
            </div>
        </div>

    );
};

export default Card;