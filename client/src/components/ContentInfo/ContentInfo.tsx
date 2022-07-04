const ContentInfo = () => {
  return (
    <div className="container flex mx-auto my-32">
      <div className="w-1/2 mr-20">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="font-title text-6xl">Article</h1>
          <p className="mt-10 font-thin ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            cupiditate sed rem a pariatur autem obcaecati ad inventore dolor,
            mollitia eligendi quam suscipit rerum quos beatae sint. Sit, fugit
            rem.
          </p>
        </div>
      </div>
      <div className="w-1/2 ml-20">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="font-title text-6xl">Blog</h1>
          <p className="mt-10 font-thin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            deserunt voluptate fuga impedit, alias dolorem veniam quasi
            doloremque architecto voluptates odit repellendus tenetur illo,
            itaque quos doloribus assumenda aperiam necessitatibus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentInfo;
