/* 
    Dear reader, this file was added for you!
    Contribution.js explains the principles of the HtmlS,
    makes pointers for files and tips for future contributors.
    HtmlS was created to finally solve all the problems of html.
    HtmlS is open source. Anyone can take part in this project.
      How does all it work?
          Project divided into three main parts:
            1) Mathematical ("begin.js" file)
            2) Theoretical ("iterations.js" file)
            3) Executionalble (both "document.json" and "iterations.js" files)
          First loads the "begin.js" file, which is just called from html.
             This happens before appears "loading" string and usually take 10-20ms
             After being loaded, "begin.js" sets a preload, calculates attributes and begins to fetch all needed files.
             Those files are "document.json", "iterations.js" and scripts with "fetch" attribute.
             Loading htmls takes about 100-150 ms. When fetches completed, script merges "document.json" and "itreations.js"
             and prints a result. Work on this file may need knowledge about network, speed calculations and memory optimization.
          After loading resources, "document.json" takes data prepared by "begin.js" and initialize reading by "iterations.js"
             The last stage of htmls work is to take htmls code given by "document.json" and build the html page.
             This part is about features, sugar and JS generated html. May require some imagination and a lot of knowledge about html.
          While the first two parts are both theoretical, the third is more about connecting two others and especially testing results.
             Not only original ideas, but tests and much more tests is what we really need. That's why we believe in open source.
      Before you begin..
         Making your contribution might be easier than you think!
         You can just write an addition - file which doesn't need a lot of knowledge, but is very important for further development.
         Creating additions is a good way to support us, which is carefully described in project Wiki.
      And, whether you decided to work with language itself..
         All the files contain notes for functions and solutions, every solution separated from others.
         Engage the community and share commentaries for your work.
         To avoid different tabulation standards - use JStab (github.com/Roseinfire/JStab)
         Program will carefully set up spaces and separate functions.
         The best way to communicate with us - github, but we don't mind whether you send an email.
     And of course, Happy Coding!
*/
