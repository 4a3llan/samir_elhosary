/* =========================================================
   SAMIR EL-HOSARY
   PROJECTS DATA
========================================================= */

(() => {
    "use strict";

    const YT = "-J53PBwNoFw"; /* placeholder YouTube video id */

    const categories = [
        { id: "commercial", label: { ar: "إعلان تجاري", en: "Commercial" } },
        { id: "social", label: { ar: "إعلان سوشيال ميديا", en: "Social Media Ad" } },
        { id: "reels", label: { ar: "محتوى ريلزات", en: "Reels Content" } },
        { id: "youtube", label: { ar: "محتوى يوتيوب", en: "YouTube Content" } },
        { id: "podcast", label: { ar: "بودكاست", en: "Podcast" } }
    ];

    /* Builds one project with placeholder text. Pass overrides in `extra`. */
    function project(cat, n, date, titleAr, titleEn, extra = {}) {
        const id = `${cat}-${n}`;
        const dir = `images/projects/${id}/`;
        const four = (name) => [1, 2, 3, 4].map((i) => `${dir}${name}-${i}.jpg`);

        return Object.assign({
            id,
            category: cat,
            date,
            thumb: `${dir}thumb.jpg`,
            poster: `${dir}poster.jpg`,
            title: { ar: titleAr, en: titleEn },
            idea: {
                ar: "شرح مختصر لفكرة المشروع والهدف منه. هذا نص تجريبي يُستبدل بالنص الحقيقي.",
                en: "A short explanation of the project idea and its goal. Placeholder text to be replaced."
            },
            challenge: {
                ar: "ما هو التحدي الذي كان موجودًا؟ ووصف مختصر لطبيعة المشروع وطريقة تنفيذه. نص تجريبي.",
                en: "What was the challenge? A brief description of the project and how it was made. Placeholder text."
            },
            raw: four("raw"),
            final: { youtube: YT, ratio: cat === "reels" ? "9/16" : "16/9" },
            bts: { images: four("bts"), youtube: YT },
            feedback: {
                ar: "رأي أو تعليق العميل / الجمهور على المشروع. نص تجريبي.",
                en: "Client / audience feedback on the project. Placeholder text."
            }
        }, extra);
    }

    const items = [
        // ------------------------------Commercial--------------------------------------------
        // 1- Commercial Advertising Department – ​​SafeOk Vault Project
        project("commercial", "safeok", "2024-09-01", "مع سيف أوك أمانك في بيتك — خزنة SafeOK المنزلية", "With SafeOK You Are Safe — SafeOK Home Safe", {
            thumb: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/301f6e77-2d42-4e78-93c8-5829ce97337d.jpg",
            poster: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/301f6e77-2d42-4e78-93c8-5829ce97337d.jpg",

            idea: {
                ar: "رؤية إخراجية سينمائية هدفها إبراز أهمية الخزنة في البيت وسهولة استخدامها لحفظ الفلوس والأوراق المهمة في مكان آمن جوة البيت بدل زحمة البنك. اعتماد كامل على إضاءة موجهة عالية التباين (High Contrast Lighting) وإيقاع حركي يبرز الأمان وسهولة الوصول لمقتنياتك في أي وقت.",
                en: "A cinematic commercial highlighting the essential need and simplicity of having a home safe for cash and important documents over traditional banking. Driven by dramatic high-contrast lighting and pacing that emphasizes everyday security and easy access."
            },

            challenge: {
                ar: "التحدي الإبداعي كان إخراج إعلان تجاري سينمائي لأول مرة في الفئة دي، وإظهار سهولة تثبيت الخزنة وشكلها العصري الشيك اللي بيليق مع ديكور البيت، من غير ما نفقد إحساس الهيبة والأمان المطلق.",
                en: "The main creative challenge was delivering the first-ever cinematic commercial in this product category, showcasing effortless home installation and modern design while maintaining a strong sense of reliability and total security."
            },

            raw: [
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6%20copy.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea633.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_vbmpp8vbmpp8vbmp.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_vtsxncvtsxncvtsx.jpg"
            ],

            final: {
                youtube: "RINe9hmwR1U",
                ratio: "16/9"
            },

            bts: {
                images: [
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea62.jpg",
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea688.jpg"
                ],
            },

            feedback: {
                ar: "بسم الله ما شاء الله، الفيديو جميل جداً وحقق نتائج مبهرة في الحملة الإعلانية! أبرز تفاصيل كتير قد إيه أنت موهوب أنت والممثلين اللي معاك، وبأقل الإمكانيات طلعتوا جودة تحفة بجد! ",
                en: "Mashallah, the video is amazing and achieved outstanding campaign results! It highlighted so many details and showed how talented you and the actors are, delivering top-tier quality with minimal resources! "
            }
        }),

        // 2- Commercial Advertising Department – Nour Market Project
        project("commercial", "nour-market", "2025-09-01", "نور ماركت — كل المنتجات البريميم والمستوردة في مكان واحد", "Nour Market — All Premium & Imported Products in One Place", {
            thumb: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/d19c5763-4223-472b-8bbc-c9943362036e.png",
            poster: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/d19c5763-4223-472b-8bbc-c9943362036e.png",

            idea: {
                ar: "رؤية إخراجية سينمائية هدفها إبراز إن نور ماركت بيجمع أكبر تشكيلة من المنتجات البريميم والمستوردة في مكان واحد. الاعتماد على كادرات متناسقة وإضاءة جودة عالية بتعكس فخامة المنتجات وسهولة الشوبينج جوة الماركت.",
                en: "A cinematic commercial highlighting Nour Market as the ultimate destination for premium and imported goods under one roof. Utilizing structured framing and high-end lighting to reflect product exclusivity and an effortless shopping experience."
            },

            challenge: {
                ar: "التحدي الإبداعي كان في التعامل مع اتساع مساحة المكان ورسم قصة سينمائية مخصوص تعبر عن الهدف التجاري، وتخدم إبراز تنوع المنتجات وضخامة الماركت من غير ما نضيع إيقاع الإعلان وحيويته.",
                en: "The primary creative challenge was navigating the vast retail space and scripting a tailored cinematic narrative to serve the commercial goal—showcasing the extensive product range and grand layout while maintaining an engaging visual rhythm."
            },

            raw: [
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/301f6e77-2d42-4e78-93c8-5829ce97337d%201232.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/301f6e77-2d42-4e78-93c8-5829ce97337d%20111.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/301f6e77-2d42-4e78-93c8-5829ce97337d23.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/301f6e77-2d42-4e78-93c8-5829ce97337d%20copy.jpg",
            ],

            final: {
                youtube: "D8K3ZeWzG6M",
                ratio: "16/9"
            },

            bts: {
                images: [
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/301f6e77-2d42-4e78-93c8-5829ce97337d%20c112py.jpg",
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/301f6e77-2d42-4e78-93c8-5829ce97337d%2011324.jpg"
                ],
                
            },

            feedback: {
                ar: "إعلان رهيييييب! إيه الحلاوة دي يا عم 😂😂😍 هنزله حالا، ربنا يعزك يا حبيبي!",
                en: "An awesome commercial! Absolutely stunning work! 😂😂😍 Uploading it right now, thank you so much my friend!"
            }
        }),

        // 3- Commercial Advertising Department – Newgen Real Estate Project
        project("commercial", "newgen", "2025-09-01", "شركة نيوجين العقارية — الرسالة العامة والوعي بالعلامة التجارية", "Newgen Real Estate — Brand Awareness & General Vision", {
            thumb: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/b91e741d-19ca-487e-b335-746cad32c3fc.png",
            poster: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/b91e741d-19ca-487e-b335-746cad32c3fc.png",

            idea: {
                ar: "رؤية إخراجية إعلانية هدفها نشر الرسالة العامة وزيادة الوعي بالرؤية المعمارية والاستثمارية لشركة نيوجين العقارية، من خلال تركيز بصري سينمائي يبرز القوة والانتشار.",
                en: "A commercial film direction designed to enhance brand awareness and communicate the core message and vision of Newgen Real Estate, utilizing strong cinematic visual storytelling."
            },

            challenge: {
                ar: "التحدي الإبداعي كان تنفيذ المشروع بمهارة عالية جداً والتعامل الإخراجي مع الظروف البيئية الصعبة، خصوصاً في ظل درجات الحرارة المرتفعة والأتربة أثناء التصوير الخارجي.",
                en: "The main creative and production challenge was executing the project with high precision while adapting to tough environmental conditions, specifically high temperatures and heavy dust during outdoor shooting."
            },

            raw: [
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/301f6e77-2d42-4e78-93c8-5829ce97337d%20790j.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/301f6e77-2d42-4e78-93c8-5829ce97337d2def.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/32t095gh0.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/301f6e77-2d42-4e78-93c8-5829ce97337d5879.jpg"
            ],

            final: {
                youtube: "24RKEeZfObA",
                ratio: "16/9"
            },

            bts: {
                images: [
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/65850aa8-5bfa-4fcd-9944-7ed06cd7b2b3.jpg",
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Screenshot%20(277).png"
                ],
            },

            feedback: {
                ar: "تحفة تحفة تحفة! فيديو جميل أوي ومفيد والإخراج والتصوير بجد تحفة في قمة الإبهاء وهيكسر الدنيا، ورئيس مجلس الإدارة عجبه جداً!",
                en: "Absolute masterpiece! Amazing and insightful video, the direction and cinematography are truly dazzling and will break the internet. The Chairman of the Board loved it immensely!"
            }
        }),

        //------------------------------Podcast--------------------------------------------
        // 1- Podcast Department – Eng. Ahmed El-Howeity Project
        project("podcast", "alhoweity", "2025-12-01", "بودكاست المرشح البرلماني م. أحمد حسين الحويطي", "Parliamentary Candidate Podcast — Eng. Ahmed El-Howeity", {
            thumb: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/fa16a6f2-8195-43f9-8851-486becbf75d1.jpg",
            poster: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/fa16a6f2-8195-43f9-8851-486becbf75d1.jpg",

            idea: {
                ar: "رؤية إخراجية لبودكاست حواري للمرشح البرلماني المهندس أحمد حسين الحويطي خلال المرحلة الانتخابية، تهدف لإبراز الرؤية والبرنامج الانتخابي بأسلوب بصري سينمائي جذاب وهادئ يعكس الثقة والاحترافية.",
                en: "A podcast film direction for parliamentary candidate Eng. Ahmed El-Howeity during the election phase, aimed at showcasing his vision and electoral program through engaging, calm, and professional cinematic visual storytelling."
            },

            challenge: {
                ar: "كنا بنواجه تحدي كبير في طبيعة المكان لأنه كافيه ومطعم مش استوديو مجهز، فقام الفريق بتفريغ وتجهيز المكان بالكامل، وتصميم سيت أب إضاءة وتصوير احترافي، وإنجاز الحلقة كاملة في وقت قياسي جداً.",
                en: "The primary challenge was adapting the venue—a busy cafe and restaurant. The entire space was cleared, custom professional lighting and camera setups were built, and the episode was produced in record time."
            },

            raw: [
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-Recovered222222.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-Recovered.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-Recovered11.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-Recovered22.jpg"
            ],

            final: {
                youtube: "rMEwfjLHD7I",
                ratio: "16/9"
            },

            bts: {
                images: [
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/68952313-5160-4ddb-83f5-aade4c145794.jpg",
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/d9f2baeb-ac78-47cc-9ae7-131a204e1357.jpg",
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/df927b62-a642-4d77-8ff3-3b6be93aa4a1.jpg",
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/cd42a50b-1ae6-491f-a7d9-4acf50b041ea.jpg"
                ],
               
            },

            feedback: {
                ar: "الله ينور عليك يا عالمي والله! حلقة جميلة متوقعتش إنك تطلعها بالشكل ده في الوقت القياسي ده!",
                en: "Bravo absolute legend! Truly an amazing episode, I didn't expect you to deliver such high quality in record time!"
            }
        }),

        //------------------------------Social Media Ads--------------------------------------------
        // 1- Social Media Advertising Section – Advertising Project for Historian Mustafa Al-Bashlawi
        project("social", "elmorikh", "2026-08-01", "إعلان المؤرخ — بداية السنة الدراسية الجديدة للمؤرخ مصطفى البشلاوي", "El-Mowarkh Promo — New Academic Year Campaign with Mostafa El-Beshlawy", {
            thumb: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/3990d4dc-11f5-4e23-a33d-56f26688246a.jpg",
            poster: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/3990d4dc-11f5-4e23-a33d-56f26688246a.jpg",

            idea: {
                ar: "رؤية إخراجية سينمائية هدفها الإعلان عن بداية السنة الدراسية الجديدة لمادة التاريخ مع المؤرخ مصطفى البشلاوي، برسم مشاهد سردية مميزة تُبسط التاريخ وتخلق شغفاً حقيقياً لدى الطلاب.",
                en: "A cinematic commercial campaign marking the launch of the new academic year for History with 'El-Mowarkh' Mostafa El-Beshlawy, utilizing narrative storytelling to engage and inspire students."
            },

            challenge: {
                ar: "التحدي الإبداعي كان في صعوبة الفكرة وتنفيذها، حيث تم تقسيم الإعلان إلى أربع قصص مختلفة ومترابطة لتخدم الأربع مسارات والتوجهات لطلاب البكالوريا، مع الحفاظ على الإيقاع والربط الإخراجي السلس.",
                en: "The primary creative challenge lay in the concept's complexity, dividing the film into four distinct narrative threads tailored to four different High School (Baccalaureate) student pathways while maintaining dynamic pacing."
            },

            raw: [
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-333.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-23.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-Recovered1452.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-Recovered46.jpg"
            ],

            final: {
                youtube: "S5hMdtsjm14",
                ratio: "16/9"
            },

            bts: {
                images: [
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Screenshot%202026-10-07%20204853.png",
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Screenshot%202026-10-07%20204938.png"
                ],
               
            },

            feedback: {
                ar: "مش عارف أقولك إيه، أنا شهادتي فيك مجروحة بس هقولك تسلم إيدك ودماغك إنهم طلعوا الإعلان بالطعامة دي! 😍❤️",
                en: "I don't even know what to say, my testimony is biased! But bless your hands and mind for delivering such a sweet and masterful commercial! 😍❤️"
            }
        }),
        // 2- Social Media Advertising Section – Promo Project for Ezbat El-Tell Ramadan Tournament
        project("social", "ezbat-eltell", "2025-03-01", "برومو دورة عزبة التل الرمضانية — إعلان الافتتاح", "Ezbat El-Tell Ramadan Tournament — Launch Promo", {
            thumb: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/01da666b-a93c-43da-b86c-0ea776b1493b.jpg",
            poster: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/01da666b-a93c-43da-b86c-0ea776b1493b.jpg",

            idea: {
                ar: "رؤية إخراجية إعلانية هدفها التعريف بافتتاح الدورة الجديدة لدورة عزبة التل الرمضانية، والاعتماد البصري الكامل على الإبهار والتركيز على حماس الجمهور وأجواء المنافسة الرمضانية الشعبية.",
                en: "A commercial promo aimed at announcing the launch of the new Ezbat El-Tell Ramadan Tournament season, relying heavily on dynamic visual impact to capture the intense energy and passion of local football."
            },

            challenge: {
                ar: "التحدي الإبداعي الأكبر كان تنفيذ المشروع بالكامل في وقت قياسي جداً (أقل من 24 ساعة) من مونتاج وتعديل ألوان وميكساج صوتي مع الحفاظ على الإبهاء البصري العالي.",
                en: "The primary creative and technical challenge was delivering a complete high-octane promo in a record turnaround time of less than 24 hours without compromising visual standards."
            },

            raw: [
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-1.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-2.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-3.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-4.jpg"
            ],
            final: {
                youtube: "CuWVDvxMGYs",
                ratio: "16/9"
            },
            bts: {
                images: [
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-Recovered%D9%8A3325.jpg",
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-Recovered2234.jpg",
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-Recovered2234.jpg",
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/2e76a0ef-1e4b-4edf-b4f1-e85560d1258f.png"
                ],
            },

            feedback: {
                ar: "احنا بنشكرك على السرعة والمجهود الغير عادي اللي عملته، الفيديو في أقل من 24 ساعة جاب 25 ألف مشاهدة وكل الناس معجبة جداً بالبرومو! بإذن الله هنشتغل مع بعض في النهائي ونعمل حاجة أحلى!",
                en: "Thank you for the insane effort and incredible speed! In less than 24 hours, the video hit 25K views and everyone is raving about the promo! We'll definitely collaborate again for the finals!"
            }
        }),
        // 3- Social Media Advertising Section – Promo Project for Martial Arts Academy in El-Hosseiniya
        project("social", "martial-arts-academy", "2026-09-01", "إعلان أكاديمية الفنون القتالية — أول أكاديمية MMA بالحسينية", "Martial Arts Academy Ad — First MMA Academy in El-Hosseiniya", {
            thumb: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/2c97b48d-22ab-49e5-94e1-479e71527230.jpg",
            poster: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/2c97b48d-22ab-49e5-94e1-479e71527230.jpg",

            idea: {
                ar: "رؤية إخراجية سينمائية سريعة وديناميكية للإعلان عن افتتاح أول أكاديمية للفنون القتالية المختلطة (MMA) في مركز الحسينية، بهدف بناء الوعي واستهداف الشباب برؤية بصرية حماسية تعكس القوة والانضباط.",
                en: "A fast-paced, dynamic commercial showcasing the launch of the first MMA Academy in El-Hosseiniya, designed to build brand awareness and inspire youth through high-energy visual storytelling emphasizing power and discipline."
            },

            challenge: {
                ar: "التحدي الإبداعي كان في طلب العميل لإعلان سوشيال ميديا سريع ومباشر، يوصل الرسالة التسويقية كاملة بأسلوب حماسي ومشوق ومناسب لجمهور الريلز والقصيرة في ثوانٍ معدودة.",
                en: "The primary challenge was crafting a swift and engaging social media ad tailored for reels/shorts format—delivering the core promotional message directly with maximum adrenaline and energy."
            },

            raw: [
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-48.jpg",
                "https://ik.imagekit.io/n1fg8reex/samir-portfolio/Gemini_Generated_Image_2ea6e02ea6e02ea6-11.jpg"
            ],

            final: {
                youtube: "fKTMv_RNlyA",
            },

            bts: {
                images: [
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/992a7b06-7cc2-40f2-be2e-062b2db73238.jpg",
                    "https://ik.imagekit.io/n1fg8reex/samir-portfolio/43b0a8b8-2460-4213-b216-0204eda51452.jpg"
                ],
                videos: [
                    { youtube: "iHYRVVc7ubo", ratio: "9/16" },
                    
                ]
            },

            feedback: {
                ar: "والله يا سمير نورتني ونورت مكانك، وأنا سعيد بيك جداً وفخور بيك والله، وبإذن الله تكون عالمي في شغلك! ❤️❤️❤️",
                en: "Samir, you truly honored me and illuminated the place! I am so happy and proud of you, and God willing, you'll become a global legend in your craft! ❤️❤️❤️"
            }
        }),
        //------------------------------Reels Content--------------------------------------------
        // 1- Reels Content Department – Medical Content Reels Series
        project("reels", "medical-reels", "2026-06-01", "صناعة ريلز المحتوى الطبي — التسويق الطبي والتوعية البصرية", "Medical Content Reels Series — Medical Marketing & Visual Awareness", {
            thumb: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/e26b4189-a78a-4dce-971b-adc179763593.jpg",
            poster: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/e26b4189-a78a-4dce-971b-adc179763593.jpg",

            idea: {
                ar: "رؤية إخراجية سينمائية متكاملة لإنتاج وصناعة محتوى بؤري وتسويقي موجه للمجال الطبي، تهدف لتبسيط المعلومات الطبية المعقدة للمشاهد وتقديمها بأسلوب ممتع وموثوق، يعزز الوعي الصحي ويبرز الهوية الشخصية والمهنية للأطباء.",
                en: "A comprehensive cinematic film direction for medical content marketing, tailored to simplify complex health information into engaging, trustworthy, and visually appealing short-form reels—building doctor brand awareness and patient trust."
            },

            challenge: {
                ar: "التحدي الإبداعي كان إيجاد التوازن المثالي بين إبراز الشرح الطبي بأسلوب علمي دقيق ومسطب، وبين صناعة فيديو سريع ومبهر يناسب خوارزميات السوشيال ميديا ويثبت المتابع، مع الاعتماد على إضاءة سينمائية مريحة وموزونة للعين وزوايا تصوير تظهر الثقة والاحترافية.",
                en: "The primary challenge was striking the right balance between precise, clear medical explanations and fast-paced, engaging content optimized for social media algorithms—using soft cinematic lighting and dynamic framing to evoke trust and authority."
            },

            raw: [],

            final: {

            ratio: "9/16",
                playlist: [
                    "31yQH1L2_SY",
                    "36bfe8qbP5Y",
                    "d_mOLFfekD0",
                    "qj8ZMxagqgI",
                    "oDEI-rDaRY8",
                    "inSlycW3l78"
                ]
            },

            bts: {
            
                videos: [
                { youtube: "NenC-r3U8bU", ratio: "9/16" },
                { youtube: "OheT2v1qgXk", ratio: "9/16" },
                { youtube: "mNAjO-fCaXE", ratio: "9/16" },
                { youtube: "KXglvxq0mg0", ratio: "9/16" }
            ]

            },

            feedback: {
                ar: "بسم الله ما شاء الله، الله ينور عليك! شغل فاخر من الآخر، تصوير عالمي وجودة خرافية، والستايل تحفة بجد. وأهم حاجة عندك السرعة والتفاني في العمل، تسلم إيدك يا عالمي! ❤️😍",
                en: "Mashallah, brilliant work! Top-tier luxury production, world-class cinematography, and incredible visual style. Most importantly, your speed and dedication to work are unmatched. Pure mastery! ❤️😍"
            }
        }),
        // 2- Reels Content Department – Real Estate Content Reels Series
        project("reels", "realestate-reels", "2026-02-01", "صناعة ريلز المحتوى العقاري — التسويق العقاري وإبراز المشاريع", "Real Estate Reels Series — Property Marketing & Brand Awareness", {
            thumb: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/a367b254-bc11-4bd7-964f-f7f4fd87d372.jpg",
            poster: "https://ik.imagekit.io/n1fg8reex/samir-portfolio/a367b254-bc11-4bd7-964f-f7f4fd87d372.jpg",

            idea: {
                ar: "رؤية إخراجية سينمائية هدفها إنتاج محتوى بصري وتسويقي مبهر موجه لمجال العقارات، يركز على إبراز المشاريع والوحدات العقارية على أرض الواقع وتعزيز الوعي بالعلامة التجارية للشركات من خلال مشاهد جذابة وإيقاع حركي سريع يخدم الأهداف الإعلانية.",
                en: "A cinematic film direction for real estate visual marketing, designed to showcase on-ground developments and property units while boosting brand awareness through high-impact, fast-paced reels tailored for property promotion."
            },

            challenge: {
                ar: "التحدي الإبداعي كان إبراز تفاصيل المشاريع وتصميماتها المعمارية الحقيقية بأسلوب جذاب وسلس على شاشات الموبايل الرأسية، مع الموازنة بين العرض المعماري الفخم وبين صنع فيديو إعلاني سريع يناسب خوارزميات السوشيال ميديا ويحقق التفاعل المطلوبة.",
                en: "The primary challenge was capturing real site locations and architectural aesthetics in vertical 9:16 format—striking the perfect balance between high-end property showcase and fast-paced engaging content optimized for social media algorithms."
            },

            raw: [],

            final: {
                ratio: "9/16",
                playlist: [
                    "3EZeZ8t1Q5w",
                    "61BUlleQ614",
                    "KXDPFeqbMlA",
                    "3ZZW48zAqYo",
                    "ig9IiykgOUE",
                    "KOsOnF8Ta20"
                ]
            },

            bts: {
                
                youtube: "3EZeZ8t1Q5w",
                videos: [
                    { youtube: "7Qa5ycOtmlg", ratio: "9/16" },
                    { youtube: "QmxhOspMJcw", ratio: "9/16" },
                    
                ]
            },

            feedback: {
                ar: "الشغل طالع بمستوى خرافي! جودة جبارة وأداء ممتاز، التصوير بجد تحفة والمونتاج كذلك.. الفيديو وصل للإدارة ورحبوا جداً بالفيديوهات وعجبتهم ومستمرين مع بعض بإذن الله! ❤️🔥",
                en: "The work came out at a mind-blowing level! Top-tier quality, excellent execution, and truly magnificent cinematography and editing. The videos reached executive management and they loved them immensely. Looking forward to our ongoing partnership! ❤️🔥"
            }
        })


    ];

    

    window.PROJECTS = { categories, items };
})();