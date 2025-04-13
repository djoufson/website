import Image from "next/image";

export default function Home() {
  return (
    <section>
      <div className="container md:flex md:gap-4">
        <div>
          <Image
            src="/djouf.png"
            alt="Djoufson's Avatar"
            width={300}
            height={300}
          />
        </div>
        <div className="md:w-[calc(100%-300px)]">
          <h1 className="title">Hi, I am Djoufson Che</h1>
          <p className="italic text-sm">Software Engineer</p>
          <p className="mt-8">
            Experienced backend engineer, Founder of <a className="link" title=".NET Cameroon Website" target="_blank" href="https://dotnet.cm">.NET Cameroon</a>. Advocate
            for open source and developer growth through community.
          </p>
        </div>
      </div>
    </section>
  );
}
