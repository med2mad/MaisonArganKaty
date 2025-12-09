import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem('language') || 'en';

i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        // Navigation
        yourCart: "Your Cart",
        freeDelivery: "Free delivery",

        // Cart
        total: "Total",
        yourInformations: "Your Informations",
        fullName: "Full Name",
        phoneNumber: "Phone Number",
        email: "Email",
        couponCode: "Coupon Code",
        shippingAddress: "Shipping Address",
        submitOrder: "Submit Order",

        // Banner
        natural: "100% natural",
        discoverArganOil: "Discover Moroccan Argan Oil with \"KATY\"",
        arganOilDescription: "In the argan oil production process there are no additives or shortcuts. All hand made and natural.",
        shopNow: "Shop Now",
        foodAndBeauty: "Food and beauty",
        shopCollection: "Shop Collection",
        bakedCleanProducts: "Baked & clean products",
        mobileBanner: "images/bannerEN.jpg",

        // Products
        trendingProducts: "Trending Products",
        addToCart: "Add to Cart",

        // Ads
        upto25Off: "Upto 25% Off",
        honey: "Honey",
        honeyDescription: "Very tasty, from our cozy garden.",
        organic100: "100% Organic",
        organicDescription: "From a farm, natural ingredients only.",
        showNow: "Shop Now",

        // Blog
        ourRecentBlogs: "Our Recent Blogs",
        readAllArticles: "Read All Articles",
        tipsTricks: "tips & tricks",
        trending: "trending",
        inspiration: "inspiration",
        aboutMe: "About me",
        aboutMeContent: "As a young ambassador, I am an active member of the Morocco-China Association, enthusiastically participating in conferences and events across Beijing, Xian, Yulin and Shanghai.",
        moroccanJourney: "A Moroccan Journey for Chinese Visitors",
        moroccanJourneyContent: "I invite Chinese visitors to discover our country, its culture and way of life. They'll get to experience authentic moments and participate in traditional activities.",
        professionalIdentity: "My professional identity",
        professionalIdentityContent: "I obtained my master's degree in Xian, specializing in teaching Chinese as a second language to foreigners. I had experience teaching Chinese language at Hassan 2 University and London Academy, and also teaching Arabic language at the primary school of Shanghai International Studies University.",

        // Footer
        freeDeliveryTitle: "Free delivery",
        freeDeliveryText: "Enjoy free delivery on all orders. Fast, reliable, and right to your doorstep!",
        securePaymentTitle: "100% secure payment",
        securePaymentText: "Shop with confidence — our payment system keeps your information safe and protected.",
        qualityGuaranteeTitle: "Quality guarantee",
        qualityGuaranteeText: "We stand by our products with a quality guarantee. Satisfaction assured every time.",
        guaranteedSavingsTitle: "Guaranteed savings",
        guaranteedSavingsText: "Guaranteed savings on every purchase — great value without compromise.",

        // Footer2
        socialMedia: "Social media",
        instagram: "Instagram",
        linkedin: "LinkedIn",
        youtube: "Youtube",
        links: "Links",
        shop: "Shop",
        blogs: "Blogs",
        toTheTop: "To the top",
        contact: "Contact",
        email2: "Email",
        tel: "Tel",
        address: "Address",
        copyright: "© 2024 MAK. All rights reserved.",

        //Nav
        languages: "Language"
      }
    },
    fr: {
      translation: {
        // Navigation
        yourCart: "Votre Panier",
        freeDelivery: "Livraison gratuite",

        // Cart
        total: "Total",
        yourInformations: "Vos Informations",
        fullName: "Nom Complet",
        phoneNumber: "Tel",
        email: "Email",
        couponCode: "Code de Réduction",
        shippingAddress: "Adresse de Livraison",
        submitOrder: "Passer la Commande",

        // Banner
        natural: "100% naturel",
        discoverArganOil: "Découvrez l'huile d'argan marocaine avec \"KATY\"",
        arganOilDescription: "Dans le processus de production de l'huile d'argan, il n'y a aucun additif ou raccourci. Tout est fait à la main et naturel.",
        shopNow: "Acheter Maintenant",
        foodAndBeauty: "Nourriture et beauté",
        shopCollection: "Voir la Collection",
        bakedCleanProducts: "Produits cuits & propres",
        mobileBanner: "images/bannerFR.jpg",

        // Products
        trendingProducts: "Produits Tendances",
        addToCart: "Ajouter au panier",

        // Ads
        upto25Off: "Jusqu'à 25% de Réduction",
        honey: "Miel",
        honeyDescription: "Très savoureux, de notre jardin confortable.",
        organic100: "100% Biologique",
        organicDescription: "D'une ferme, uniquement des ingrédients naturels.",
        showNow: "Acheter Maintenant",

        // Blog
        ourRecentBlogs: "Nos Derniers Blogs",
        readAllArticles: "Lire Tous les Articles",
        tipsTricks: "astuces & conseils",
        trending: "tendance",
        inspiration: "inspiration",
        aboutMe: "À propos de moi",
        aboutMeContent: "En tant que jeune ambassadeur, je suis un membre actif de l'Association Maroc-Chine, participant avec enthousiasme à des conférences et événements à travers Beijing, Xian, Yulin et Shanghai.",
        moroccanJourney: "Un Voyage Marocain pour les Visiteurs Chinois",
        moroccanJourneyContent: "J'invite les visiteurs chinois à découvrir notre pays, sa culture et son mode de vie. Ils pourront vivre des moments authentiques et participer à des activités traditionnelles.",
        professionalIdentity: "Mon identité professionnelle",
        professionalIdentityContent: "J'ai obtenu mon master à Xian, spécialisé dans l'enseignement du chinois comme langue seconde aux étrangers. J'ai eu l'expérience d'enseigner la langue chinoise à l'Université Hassan II et à la London Academy, et aussi d'enseigner la langue arabe à l'école primaire de l'Université des études internationales de Shanghai.",

        // Footer
        freeDeliveryTitle: "Livraison gratuite",
        freeDeliveryText: "Profitez de la livraison gratuite sur toutes les commandes. Rapide, fiable et directement à votre porte!",
        securePaymentTitle: "Paiement 100% sécurisé",
        securePaymentText: "Achetez en toute confiance — notre système de paiement protège vos informations.",
        qualityGuaranteeTitle: "Garantie de qualité",
        qualityGuaranteeText: "Nous garantissons la qualité de nos produits. Satisfaction assurée à chaque fois.",
        guaranteedSavingsTitle: "Économies garanties",
        guaranteedSavingsText: "Économies garanties sur chaque achat — excellent rapport qualité-prix.",

        // Footer2
        socialMedia: "Réseaux sociaux",
        instagram: "Instagram",
        linkedin: "LinkedIn",
        youtube: "Youtube",
        links: "Liens",
        shop: "Boutique",
        blogs: "Blogs",
        toTheTop: "Retour en haut",
        contact: "Contact",
        email2: "Email",
        tel: "Téléphone",
        address: "Adresse",
        copyright: "© 2024 MAK. Tous droits réservés.",

        //Nav
        languages: "Langue"
      }
    },
    ch: {
      translation: {
        // Navigation
        yourCart: "您的购物车",
        freeDelivery: "免费送货",

        // Cart
        total: "总计",
        yourInformations: "您的信息",
        fullName: "全名",
        phoneNumber: "电话号码",
        email: "电子邮件",
        couponCode: "优惠券代码",
        shippingAddress: "送货地址",
        submitOrder: "提交订单",

        // Banner
        natural: "100% 天然",
        discoverArganOil: "与\"KATY\"一起探索摩洛哥坚果油",
        arganOilDescription: "在摩洛哥坚果油的生产过程中没有任何添加剂或捷径。全部手工制作且天然。",
        shopNow: "立即购买",
        foodAndBeauty: "食品与美容",
        shopCollection: "查看系列",
        bakedCleanProducts: "烘焙和清洁产品",
        mobileBanner: "images/bannerCH.jpg",

        // Products
        trendingProducts: "热门产品",
        addToCart: "添加到购物车",

        // Ads
        upto25Off: "高达25%折扣",
        honey: "蜂蜜",
        honeyDescription: "非常美味，来自我们舒适的花园。",
        organic100: "100% 有机",
        organicDescription: "来自农场，仅使用天然成分。",
        showNow: "立即购买",

        // Blog
        ourRecentBlogs: "我们的最新博客",
        readAllArticles: "阅读所有文章",
        tipsTricks: "提示与技巧",
        trending: "趋势",
        inspiration: "灵感",
        aboutMe: "关于我",
        aboutMeContent: "作为年轻的摩洛哥-中国协会大使，我积极参与在北京、西安、榆林和上海等地举办的会议和活动。",
        moroccanJourney: "中国游客的摩洛哥之旅",
        moroccanJourneyContent: "我邀请中国游客来探索我们的国家、文化和生活方式。他们将体验真实的时刻并参与传统活动。",
        professionalIdentity: "我的专业身份",
        professionalIdentityContent: "我在西安获得了硕士学位，专业是向外国人教授汉语作为第二语言。我有在哈桑二世大学和伦敦学院教授汉语的经验，也在上海外国语大学附属小学教授阿拉伯语。",

        // Footer
        freeDeliveryTitle: "免费送货",
        freeDeliveryText: "所有订单享受免费送货服务。快速、可靠，直接送到您家门口！",
        securePaymentTitle: "100%安全支付",
        securePaymentText: "放心购物——我们的支付系统保护您的信息安全。",
        qualityGuaranteeTitle: "质量保证",
        qualityGuaranteeText: "我们保证产品质量。每次购物都让您满意。",
        guaranteedSavingsTitle: "保证节省",
        guaranteedSavingsText: "每次购买都保证节省——物超所值。",

        // Footer2
        socialMedia: "社交媒体",
        instagram: "Instagram",
        linkedin: "LinkedIn",
        youtube: "Youtube",
        links: "链接",
        shop: "商店",
        blogs: "博客",
        toTheTop: "回到顶部",
        contact: "联系",
        email2: "电子邮件",
        tel: "电话",
        address: "地址",
        copyright: "© 2024 MAK。保留所有权利。",

        //Nav
        languages: "语言"
      }
    }
  }
});

export default i18n;