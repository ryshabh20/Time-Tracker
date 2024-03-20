import { connect } from "@/db/dbConfig";
import User from "@/db/models/userSchema";
import Client from "@/db/models/clientSchema";
import { NextResponse } from "next/server";

connect();
export async function POST() {
  const response = await Client.insertMany([
    {
      clientname: "Payton Dries",
      contactnumber: "464-789-0599",
      email: "pdries0@parallels.com",
      country: "Indonesia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Holly-anne Blakey",
      contactnumber: "613-491-8377",
      email: "hblakey1@zimbio.com",
      country: "Australia",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Batholomew Bell",
      contactnumber: "122-656-0498",
      email: "bbell2@goo.gl",
      country: "Albania",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Collin Craddy",
      contactnumber: "196-736-7077",
      email: "ccraddy3@cbc.ca",
      country: "Portugal",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Moe Eilhart",
      contactnumber: "196-314-1737",
      email: "meilhart4@si.edu",
      country: "Honduras",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Tiffani Reinisch",
      contactnumber: "137-226-0829",
      email: "treinisch5@exblog.jp",
      country: "Philippines",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Massimo Ajean",
      contactnumber: "341-212-5617",
      email: "majean6@uiuc.edu",
      country: "China",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Ethelbert Bidwell",
      contactnumber: "584-348-7853",
      email: "ebidwell7@google.de",
      country: "Belarus",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Drona Burwood",
      contactnumber: "684-809-0387",
      email: "dburwood8@blog.com",
      country: "Kazakhstan",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Renato Billo",
      contactnumber: "752-828-4541",
      email: "rbillo9@sfgate.com",
      country: "Brazil",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Oriana Gabler",
      contactnumber: "313-795-5250",
      email: "ogablera@foxnews.com",
      country: "Ecuador",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Junette Deschelle",
      contactnumber: "538-951-5833",
      email: "jdeschelleb@odnoklassniki.ru",
      country: "Indonesia",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Yancy Keady",
      contactnumber: "658-680-9399",
      email: "ykeadyc@ca.gov",
      country: "Dominican Republic",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Liza Juett",
      contactnumber: "586-284-4295",
      email: "ljuettd@imdb.com",
      country: "China",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Sena Trustrie",
      contactnumber: "906-420-5105",
      email: "strustriee@yellowpages.com",
      country: "Thailand",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Gael Thonason",
      contactnumber: "247-125-0925",
      email: "gthonasonf@soup.io",
      country: "Panama",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Meade Aberhart",
      contactnumber: "993-865-6789",
      email: "maberhartg@cbc.ca",
      country: "Philippines",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Dulsea Scrowson",
      contactnumber: "740-695-8431",
      email: "dscrowsonh@dedecms.com",
      country: "China",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Edythe Antusch",
      contactnumber: "444-376-1338",
      email: "eantuschi@lulu.com",
      country: "Latvia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Collie Kinnerk",
      contactnumber: "999-307-9224",
      email: "ckinnerkj@state.tx.us",
      country: "Tunisia",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Haily Shipman",
      contactnumber: "882-943-3133",
      email: "hshipmank@yolasite.com",
      country: "Poland",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Engracia Wilshin",
      contactnumber: "146-914-9549",
      email: "ewilshinl@weebly.com",
      country: "Indonesia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Rosella Klosa",
      contactnumber: "923-104-9819",
      email: "rklosam@ocn.ne.jp",
      country: "Poland",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Chandal Owain",
      contactnumber: "504-971-5977",
      email: "cowainn@angelfire.com",
      country: "Ukraine",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Noak Charlet",
      contactnumber: "814-691-3319",
      email: "ncharleto@chronoengine.com",
      country: "Philippines",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Hazlett Piatti",
      contactnumber: "355-119-8855",
      email: "hpiattip@yelp.com",
      country: "Peru",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Evangelin McCutheon",
      contactnumber: "351-518-3876",
      email: "emccutheonq@lycos.com",
      country: "China",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Edyth Tollow",
      contactnumber: "546-795-6736",
      email: "etollowr@ucoz.com",
      country: "Poland",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Robbie Shankster",
      contactnumber: "517-812-1305",
      email: "rshanksters@people.com.cn",
      country: "Panama",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Freeland Moatt",
      contactnumber: "693-805-7611",
      email: "fmoattt@wisc.edu",
      country: "China",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Cosme Deeley",
      contactnumber: "590-330-7128",
      email: "cdeeleyu@wired.com",
      country: "Russia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Ted Ledeker",
      contactnumber: "929-644-9531",
      email: "tledekerv@wikimedia.org",
      country: "Malaysia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Lea Harston",
      contactnumber: "172-602-7347",
      email: "lharstonw@nasa.gov",
      country: "Indonesia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Lorna Filpi",
      contactnumber: "123-479-6611",
      email: "lfilpix@engadget.com",
      country: "China",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Benn Jeckell",
      contactnumber: "504-735-0819",
      email: "bjeckelly@spiegel.de",
      country: "Serbia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Constancia Lawlings",
      contactnumber: "402-432-8025",
      email: "clawlingsz@opera.com",
      country: "Russia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Lindie Tomasutti",
      contactnumber: "756-597-5989",
      email: "ltomasutti10@fema.gov",
      country: "Serbia",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Corina Lammenga",
      contactnumber: "635-510-9194",
      email: "clammenga11@sphinn.com",
      country: "Portugal",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Doro Pabelik",
      contactnumber: "376-246-9174",
      email: "dpabelik12@nydailynews.com",
      country: "China",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Phyllida Peat",
      contactnumber: "199-216-6290",
      email: "ppeat13@howstuffworks.com",
      country: "Philippines",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Bebe Newey",
      contactnumber: "839-243-8306",
      email: "bnewey14@oakley.com",
      country: "Indonesia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Cheston Lenham",
      contactnumber: "652-728-0522",
      email: "clenham15@ycombinator.com",
      country: "Portugal",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Bertrand Jurek",
      contactnumber: "829-549-5249",
      email: "bjurek16@meetup.com",
      country: "Portugal",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Archy Stoving",
      contactnumber: "849-173-6625",
      email: "astoving17@stumbleupon.com",
      country: "Egypt",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Ketti Flacke",
      contactnumber: "416-643-8108",
      email: "kflacke18@loc.gov",
      country: "China",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Kelby Kleinmintz",
      contactnumber: "805-296-6643",
      email: "kkleinmintz19@pcworld.com",
      country: "Indonesia",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Denna Calvard",
      contactnumber: "837-900-8446",
      email: "dcalvard1a@nasa.gov",
      country: "Russia",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Cissy Hugland",
      contactnumber: "467-921-2098",
      email: "chugland1b@123-reg.co.uk",
      country: "Tanzania",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Robbie Northwood",
      contactnumber: "302-882-4286",
      email: "rnorthwood1c@themeforest.net",
      country: "China",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Casandra Walak",
      contactnumber: "247-635-1044",
      email: "cwalak1d@flickr.com",
      country: "Brazil",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Zorina Biesinger",
      contactnumber: "107-741-7800",
      email: "zbiesinger1e@alibaba.com",
      country: "Canada",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Karlen Culver",
      contactnumber: "381-878-6589",
      email: "kculver1f@foxnews.com",
      country: "Canada",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Anjela Jannaway",
      contactnumber: "641-458-6871",
      email: "ajannaway1g@adobe.com",
      country: "Egypt",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Misty Esome",
      contactnumber: "426-522-4220",
      email: "mesome1h@clickbank.net",
      country: "France",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Leona Horry",
      contactnumber: "686-395-1546",
      email: "lhorry1i@tumblr.com",
      country: "Canada",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Eudora Baskeyfield",
      contactnumber: "165-771-0325",
      email: "ebaskeyfield1j@live.com",
      country: "China",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Hope Timewell",
      contactnumber: "177-804-3424",
      email: "htimewell1k@sbwire.com",
      country: "Indonesia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Mellicent Gregs",
      contactnumber: "119-535-6514",
      email: "mgregs1l@berkeley.edu",
      country: "Panama",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Colin Paulitschke",
      contactnumber: "282-753-2603",
      email: "cpaulitschke1m@themeforest.net",
      country: "Malawi",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Ania Godin",
      contactnumber: "250-361-1839",
      email: "agodin1n@pinterest.com",
      country: "Peru",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Gabriell Mountstephen",
      contactnumber: "349-561-4632",
      email: "gmountstephen1o@yellowpages.com",
      country: "Philippines",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Tawnya Batterbee",
      contactnumber: "457-548-3616",
      email: "tbatterbee1p@symantec.com",
      country: "Poland",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Kory Jerome",
      contactnumber: "885-783-8697",
      email: "kjerome1q@skype.com",
      country: "China",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Amie Paxman",
      contactnumber: "856-352-3688",
      email: "apaxman1r@geocities.jp",
      country: "Brazil",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Giorgi Leere",
      contactnumber: "193-246-2067",
      email: "gleere1s@yellowpages.com",
      country: "Russia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Mose Tapson",
      contactnumber: "859-445-4455",
      email: "mtapson1t@ow.ly",
      country: "Sweden",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Avivah Yurov",
      contactnumber: "968-521-8957",
      email: "ayurov1u@umn.edu",
      country: "France",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Del Weatherburn",
      contactnumber: "821-113-0786",
      email: "dweatherburn1v@homestead.com",
      country: "China",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Roseanna Tiddy",
      contactnumber: "315-507-7890",
      email: "rtiddy1w@infoseek.co.jp",
      country: "Indonesia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Pamela Forestel",
      contactnumber: "242-896-5681",
      email: "pforestel1x@microsoft.com",
      country: "Russia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Baillie Givens",
      contactnumber: "178-228-1328",
      email: "bgivens1y@zdnet.com",
      country: "Mexico",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Rodrick Casier",
      contactnumber: "585-164-8424",
      email: "rcasier1z@dot.gov",
      country: "Mongolia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Jedidiah Rabjohns",
      contactnumber: "994-331-9773",
      email: "jrabjohns20@xrea.com",
      country: "China",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Gavan Linacre",
      contactnumber: "172-670-5924",
      email: "glinacre21@github.io",
      country: "Indonesia",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Mozes Befroy",
      contactnumber: "138-933-5902",
      email: "mbefroy22@technorati.com",
      country: "Russia",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Leon Zemler",
      contactnumber: "359-234-8844",
      email: "lzemler23@webs.com",
      country: "Tanzania",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Inigo Schoenleiter",
      contactnumber: "414-822-8015",
      email: "ischoenleiter24@cnet.com",
      country: "Indonesia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Cori Heady",
      contactnumber: "752-320-8744",
      email: "cheady25@globo.com",
      country: "China",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Nicky Ferrea",
      contactnumber: "933-456-1129",
      email: "nferrea26@bravesites.com",
      country: "China",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Blondie Teek",
      contactnumber: "811-155-7348",
      email: "bteek27@chron.com",
      country: "Indonesia",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Paton Lassen",
      contactnumber: "358-585-9942",
      email: "plassen28@bandcamp.com",
      country: "Japan",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Leonora Duffie",
      contactnumber: "525-877-9071",
      email: "lduffie29@home.pl",
      country: "Portugal",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Jecho Tuley",
      contactnumber: "316-390-3660",
      email: "jtuley2a@epa.gov",
      country: "Finland",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Suzann Alekhov",
      contactnumber: "586-400-4733",
      email: "salekhov2b@topsy.com",
      country: "Russia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Robinett Nickols",
      contactnumber: "130-880-6434",
      email: "rnickols2c@redcross.org",
      country: "Portugal",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Evania Aucourte",
      contactnumber: "253-502-1272",
      email: "eaucourte2d@lulu.com",
      country: "Brazil",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Leupold Brashaw",
      contactnumber: "939-972-6907",
      email: "lbrashaw2e@msn.com",
      country: "Japan",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Rodrigo Mulhall",
      contactnumber: "399-556-7557",
      email: "rmulhall2f@cornell.edu",
      country: "Indonesia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Joeann Discombe",
      contactnumber: "374-538-4491",
      email: "jdiscombe2g@usnews.com",
      country: "China",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Koralle Leverett",
      contactnumber: "544-878-3680",
      email: "kleverett2h@amazon.co.jp",
      country: "China",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Marcellina Boylund",
      contactnumber: "493-117-3361",
      email: "mboylund2i@barnesandnoble.com",
      country: "China",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Cathrine Lahive",
      contactnumber: "421-405-1312",
      email: "clahive2j@wunderground.com",
      country: "Russia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Salim Wise",
      contactnumber: "362-151-9392",
      email: "swise2k@google.es",
      country: "Russia",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Benedicta Hickin",
      contactnumber: "129-166-1326",
      email: "bhickin2l@eventbrite.com",
      country: "France",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Patsy Prudence",
      contactnumber: "653-218-4045",
      email: "pprudence2m@unc.edu",
      country: "Peru",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Renault Londer",
      contactnumber: "429-523-3609",
      email: "rlonder2n@virginia.edu",
      country: "Canada",
      projects: [],
      status: false,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Bernardo Saph",
      contactnumber: "809-644-2728",
      email: "bsaph2o@ed.gov",
      country: "Indonesia",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Meara Deehan",
      contactnumber: "189-625-6478",
      email: "mdeehan2p@youtube.com",
      country: "Philippines",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Prentiss Womack",
      contactnumber: "133-735-8504",
      email: "pwomack2q@a8.net",
      country: "Brazil",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
    {
      clientname: "Jacklin Widocks",
      contactnumber: "977-333-4791",
      email: "jwidocks2r@latimes.com",
      country: "Afghanistan",
      projects: [],
      status: true,
      adminId: "65f98ec44be105af48dd553a",
    },
  ]);
  return NextResponse.json({ message: "Voila" });
}
