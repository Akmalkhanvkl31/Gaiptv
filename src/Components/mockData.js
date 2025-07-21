const mockData = {
  categories: ['All', 'Live Events', 'Technology', 'Compliance', 'Strategy', 'Risk Management', 'Customer Service', 'Innovation', 'Analytics'],
  
  liveStreams: [
    {
      id: 'live-1',
      title: 'Live Insurance Summit 2025',
      isLive: true,
      viewers: 12847,
      description: 'Live coverage of the annual insurance innovation summit featuring keynote speakers from major insurance companies.',
      category: 'Live Events',
      speaker: 'Insurance Industry Leaders',
      duration: 'LIVE',
      views: 15420,
      uploadDate: 'Broadcasting Now',
      videoSrc: 'https://iframes.5centscdn.in/5centscdn/hls/skin1/kygt6dlsg6zh7rmq/aHR0cHM6Ly80M3dyempucHFveGUtaGxzLWxpdmUud21uY2RuLm5ldC9HQUlQL1RWL3BsYXlsaXN0Lm0zdTg=?showcv=true&title=GAIP/TV',
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop&crop=center'
    }
  ],
  
  featuredVideos: [
    {
      id: '1',
      title: 'AI in Insurance: Transforming Claims Processing',
      description: 'Discover how artificial intelligence is revolutionizing insurance claims processing, reducing costs and improving customer satisfaction.',
      category: 'Technology',
      speaker: 'Dr. Sarah Mitchell, AI Insurance Expert',
      duration: '45:30',
      views: 8500,
      uploadDate: '2 days ago',
      videoSrc: 'https://player.vimeo.com/video/76979871',
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop&crop=center',
      watchProgress: 65
    },
    {
      id: '2',
      title: 'Regulatory Compliance in Digital Insurance',
      description: 'Understanding the latest compliance requirements for digital insurance platforms and how to implement them effectively.',
      category: 'Compliance',
      speaker: 'Michael Chen, Compliance Director',
      duration: '32:15',
      views: 6200,
      uploadDate: '1 week ago',
      videoSrc: 'https://player.vimeo.com/video/169599296',
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop&crop=center',
      watchProgress: 30
    },
    {
      id: '3',
      title: 'Customer Experience Innovation in InsurTech',
      description: 'Learn how leading insurance companies are leveraging technology to create seamless customer experiences.',
      category: 'Innovation',
      speaker: 'Emma Rodriguez, CX Strategy Lead',
      duration: '28:45',
      views: 4700,
      uploadDate: '3 days ago',
      videoSrc: 'https://player.vimeo.com/video/148751763',
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop&crop=center'
    },
    {
      id: '4',
      title: 'Risk Assessment with Big Data Analytics',
      description: 'Explore advanced analytics techniques for better risk assessment and pricing strategies in modern insurance.',
      category: 'Analytics',
      speaker: 'James Park, Data Science Manager',
      duration: '52:20',
      views: 7800,
      uploadDate: '5 days ago',
      videoSrc: 'https://player.vimeo.com/video/125095515',
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&crop=center',
      watchProgress: 85
    },
    {
      id: '5',
      title: 'Cybersecurity Best Practices for Insurance',
      description: 'Essential cybersecurity measures every insurance company needs to implement to protect customer data and business operations.',
      category: 'Technology',
      speaker: 'Alex Thompson, Cybersecurity Expert',
      duration: '41:12',
      views: 5600,
      uploadDate: '1 week ago',
      videoSrc: 'https://player.vimeo.com/video/148751763',
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&crop=center'
    },
    {
      id: '6',
      title: 'Climate Risk and Insurance Modeling',
      description: 'How climate change is reshaping risk assessment and insurance modeling practices worldwide.',
      category: 'Risk Management',
      speaker: 'Dr. Lisa Wang, Climate Risk Analyst',
      duration: '38:55',
      views: 3200,
      uploadDate: '4 days ago',
      videoSrc: 'https://player.vimeo.com/video/76979871',
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop&crop=center',
      watchProgress: 12
    },
    {
      id: '7',
      title: 'Digital Transformation in Life Insurance',
      description: 'Case studies and strategies for successful digital transformation initiatives in the life insurance sector.',
      category: 'Strategy',
      speaker: 'Robert Kim, Digital Strategy Director',
      duration: '46:33',
      views: 9100,
      uploadDate: '6 days ago',
      videoSrc: 'https://player.vimeo.com/video/169599296',
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop&crop=center'
    },
    {
      id: '8',
      title: 'Customer Service Excellence in Insurance',
      description: 'Proven strategies for delivering exceptional customer service and building long-term customer relationships.',
      category: 'Customer Service',
      speaker: 'Maria Garcia, Customer Experience Manager',
      duration: '34:28',
      views: 4800,
      uploadDate: '1 week ago',
      videoSrc: 'https://player.vimeo.com/video/125095515',
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop&crop=center',
      watchProgress: 50
    }
  ],
  
  news: [
    {
      id: 1,
      type: 'regular',
      title: 'Insurance AI Summit Goes Live',
      content: 'Join industry leaders discussing the future of AI in insurance. The summit features groundbreaking presentations on machine learning applications in claims processing, underwriting automation, and customer service enhancement.',
      date: 'Today'
    },
    {
      id: 2,
      type: 'update',
      title: 'New Regulatory Guidelines Released',
      content: 'Updated compliance requirements for digital insurance platforms have been released by regulatory authorities. The new guidelines focus on data protection, customer privacy, and digital identity verification protocols.',
      date: 'June 23'
    },
    {
      id: 3,
      type: 'regular',
      title: 'InsureTech Funding Reaches Record High',
      content: '$2.4B raised in Q2 2025, marking the highest quarterly investment in insurance technology startups. The funding surge is driven by innovations in AI, automation, and digital customer experience solutions.',
      date: 'June 22'
    },
    {
      id: 4,
      type: 'breaking',
      title: 'Cyber Insurance Claims Surge 340%',
      content: '340% increase in cyber insurance claims following recent cyber attacks on major corporations. This surge highlights the critical need for comprehensive digital protection strategies and updated cyber insurance policies.',
      date: 'Breaking'
    },
    {
      id: 5,
      type: 'update',
      title: 'Climate Risk Assessment Standards Updated',
      content: 'New international standards for climate risk assessment in insurance have been established. These standards will help insurers better evaluate and price climate-related risks across different geographical regions.',
      date: 'June 21'
    }
  ]
};

export default mockData;