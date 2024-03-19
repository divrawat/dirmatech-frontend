import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { singleBlog, listRelated, getAllBlogSlugs } from '../actions/blog';
import { DOMAIN, APP_NAME } from "../config";
import SmallCard from '@/components/SmallCard';
import { isAuth } from '@/actions/auth';
import { format, utcToZonedTime } from 'date-fns-tz';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ImLinkedin } from "react-icons/im";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa"; 


const SingleBlogPost = ({ blog, errorCode }) => {

    if (errorCode) {
        return (
            <>
                <Navbar />
                <div className='dark:bg-[#090909] dark:text-white'>
                    <br />
                    <div className="flex justify-center items-center h-[70vh]">
                        <img src="/404.jpg" className="max-w-full max-h-full" alt="" />
                    </div>
                    <div className=' text-center font-bold text-5xl mt-5 pb-10'>Page Not Found</div>
                </div>
                <Footer />
            </>
        );
    }

    const [related, setrelated] = useState([]);

    const fetchData = async () => {
        try {
            const data = await listRelated(blog.slug); setrelated(data);
        } catch (error) { console.error('Error fetching Blogs:', error); }
    };


    const [user, setUser] = useState(null);

    useEffect(() => { fetchData() }, [blog.slug]);
    useEffect(() => { setUser(isAuth()) }, []);

    const showRelatedBlog = () => {
        return (related && related.map((blog, i) => (
            <article key={i} className="sm:w-[350px] my-8 mx-6 sm:mx-auto rounded  border dark:bg-black bg-white border-gray-300 hover:scale-105 transition-transform"><SmallCard blog={blog} /></article>
        )))
    };



    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (<Link key={i} href={`/categories/${c.slug}`}><button className='bg-black text-[#89f379] m-3 hover:scale-105 transition-transform font-bold rounded py-2 px-3'  >{c.name}</button></Link>
        ));




    // const showComments = () => {return (<DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`} />);};

    const formattedDate = blog.formattedDate;


    const schema =
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${DOMAIN}`
        },
        "headline": `${blog.title}`,
        "description":  `${blog.mdesc}`,
        "image": `${blog.photo}`,  
        "author": {
          "@type": "Person",
          "name": `${blog.postedBy.name}`,
          "url": `${DOMAIN}/profile/${blog.postedBy.username}`
        },  
        "publisher": {
          "@type": "Organization",
          "name": {APP_NAME},
          "logo": {
            "@type": "ImageObject",
            "url": `${DOMAIN}/newlogo.png}`
          }
        },
        "datePublished": {formattedDate},
        "dateModified": {formattedDate}
      }

    const head = () => (
        <Head>
            <title >{`${blog.title} - ${APP_NAME}`}</title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/${blog.slug}`} />
            <meta property="og:title" content={`${blog.mtitle}| ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta name="robots" content="index, follow" />
            <meta property="og:url" content={`${DOMAIN}/${blog.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={blog.photo} />
            <meta property="og:image:secure_url" content={blog.photo} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="article:published_time" content={blog.date} />
            <meta property="article:modified_time" content={blog.date} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        </Head>
    );





    return (

        <>
            {head()}
            <Navbar />
            <main className='  dark:bg-[#131314] dark:text-[#eae9e9]'>
                <div className='max-w-[950px] mx-auto p-5'>
                    <article>

                        <section >
                            <section className='mx-auto'>

                                {user && isAuth().role === 1 && (<div className='flex justify-end'><a className='bg-[#28113f] dark:bg-[#626161] py-1 px-3 font-bold rounded hover:scale-105 transition-transform text-[#89f379]' href={`${DOMAIN}/admin/blog/${blog.slug}`}>Edit</a></div>)}

                                <header className='text-center'>
                                    <h1 className='font-extrabold md:text-4xl text-3xl mb-3 mt-5 dark:text-[whitesmoke]' style={{ wordSpacing: "5px" }}>{blog.title}</h1>

                                    <section>
                                        {formattedDate} &nbsp; by &nbsp;
                                        {blog.postedBy && blog.postedBy.name && blog.postedBy.username ? (
                                            <Link className='underline hover:text-[blue]' href={`/profile/${blog.postedBy.username}`}>
                                                {blog.postedBy.name}
                                            </Link>
                                        ) : (
                                            <span>User</span>
                                        )}

                                    </section>
                                </header>

                                <br />
                                <section >
                                    <div className='flex justify-center md:h-[350px] mt-3'>
                                        <img src={blog.photo} alt={blog.title} className='md:object-cover' />
                                    </div>
                                </section>


                                <br /><br />
                            </section>



                            <section className="postcontent">

                                <div dangerouslySetInnerHTML={{ __html: blog.body }} />
                                

                                <div style={{ textAlign: "center" }}>

                                    {showBlogCategories(blog)}
                                </div>
                            </section>
                        </section>
                        <br />
                        <br />


                    </article>
                </div>
            </main>



            <section className='dark:bg-[#10141c] dark:text-[whitesmoke]'>
                <br/><br/><br/>

                <div className='border-2 border-dashed border-[grey] md:w-[800px] md:mx-auto mx-5 sm:p-8 p-4 rounded'>
                    <div className='flex justify-center'> <img src="/author.png" alt="" className='h-[100px] w-[90px]' /></div>
                    <p className='text-center font-bold text-xl mt-5' style={{ wordSpacing: "1.7px" }}>Divyanshu Rawat</p>

                    <div className='flex justify-center gap-5 mt-5'>
                        <div><a target='_blank' className='text-[#0a66c2]' href="https://www.linkedin.com/in/divyanshu-rawat-380911210/"><ImLinkedin size={30} /></a></div>
                        <div><a target='_blank' className='text-[#e77a47]' href="https://www.instagram.com/divrawat2001"><FaInstagramSquare size={30} /></a></div>
                        <div><a target='_blank' className='text-[#1f2328]' href="https://github.com/divrawat"><FaGithub size={30} /></a></div>
                    </div>


                    <p className='text-center  mt-5 leading-8' style={{ wordSpacing: "1.7px" }}>Hi there! I am a tech enthusiast, Full Stack Developer and writer. I love sharing insights on technology and web development through my articles. When I'm not coding, you can find me outdoors or lost in a good book.</p>


                </div>

                <div className='md:text-4xl text-3xl font-bold text-center md:pt-[180px] pt-10' style={{ wordSpacing: "1.7px" }}>Related Posts</div>
                <section className=' max-w-[1000px] flex sm:gap-[70px] gap-5 md:mt-10 mt-3 pb-5 justify-center mx-auto flex-wrap'>{showRelatedBlog()}</section>
            </section >


            <Footer />
        </>
    );

};



export async function getStaticPaths() {
    const slugs = await getAllBlogSlugs();
    const excludedSlugs = ['/admin/edit-blogs', '/admin/web-stories/create-story', '/admin/web-stories/all-stories', '/admin/category', 'admin/add-blog', '/sitemap.xml', 'web-story-sitemap.xml', '/feeds.xml'];
    const filteredSlugs = slugs.filter((slugObject) => !excludedSlugs.includes(slugObject.slug));
    const paths = filteredSlugs.map((slugObject) => ({ params: { slug: slugObject.slug } }));
    return { paths, fallback: "blocking" };
}



export async function getStaticProps({ params }) {
    try {
        const data = await singleBlog(params.slug);
        if (data.error) { return { props: { errorCode: 404 } }; }
        //   const formattedDate = format(new Date(data.date), 'dd MMMM, yyyy', { timeZone: 'Asia/Kolkata' });
        const utcDate = new Date(data.date);
        const istDate = utcToZonedTime(utcDate, 'Asia/Kolkata');
        const formattedDate = format(istDate, 'dd MMM, yyyy', { timeZone: 'Asia/Kolkata' });

        return { props: { blog: { ...data, formattedDate } } };
    } catch (error) {
        console.error(error);
        return { props: { errorCode: 500 } };
    }
}

export default SingleBlogPost;