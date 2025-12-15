
function BlogSection({ t }) {
    return (
        <section id="latest-blog" className="py-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="section-header d-flex align-items-center justify-content-between">
                        <h2 id="blogsid" className="section-title">{t('ourRecentBlogs')}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <article className="post-item card border-0 shadow-sm p-3">
                            <div className="image-holder zoom-effect">
                                <a href="javascript:void(0)">
                                    <img src="images/posts/2.jpg" alt="post" className="card-img-top" />
                                </a>
                            </div>
                            <div className="card-body">
                                <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                                    <div className="meta-date"><svg width="16" height="16"><use xlinkHref="#calendar"></use></svg>22/08/2023</div>
                                </div>
                                <div className="post-header">
                                    <h3 className="post-title">
                                        <a href="javascript:void(0)" className="text-decoration-none">{t('aboutMe')}</a>
                                    </h3>
                                    <p>{t('aboutMeContent')}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="col-md-4">
                        <article className="post-item card border-0 shadow-sm p-3">
                            <div className="image-holder zoom-effect">
                                <a href="#javascript:void(0)">
                                    <img src="images/posts/3.jpg" alt="post" className="card-img-top" />
                                </a>
                            </div>
                            <div className="card-body">
                                <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                                    <div className="meta-date"><svg width="16" height="16"><use xlinkHref="#calendar"></use></svg>25/03/2024</div>
                                </div>
                                <div className="post-header">
                                    <h3 className="post-title">
                                        <a href="javascript:void(0)" className="text-decoration-none">{t('moroccanJourney')}</a>
                                    </h3>
                                    <p>{t('moroccanJourneyContent')}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="col-md-4">
                        <article className="post-item card border-0 shadow-sm p-3">
                            <div className="image-holder zoom-effect">
                                <a href="javascript:void(0)">
                                    <img src="images/posts/1.jpg" alt="post" className="card-img-top" />
                                </a>
                            </div>
                            <div className="card-body">
                                <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                                    <div className="meta-date"><svg width="16" height="16"><use xlinkHref="#calendar"></use></svg>11/09/2024</div>
                                </div>
                                <div className="post-header">
                                    <h3 className="post-title">
                                        <a href="javascript:void(0)" className="text-decoration-none">{t('professionalIdentity')}</a>
                                    </h3>
                                    <p>{t('professionalIdentityContent')}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogSection;
