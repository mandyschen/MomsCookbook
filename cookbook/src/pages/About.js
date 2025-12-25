import React from 'react';

function About() {
    return (
        <div>
            <div className="home-header">
                <h1>About the Website</h1>
                <img 
                    src={`${process.env.PUBLIC_URL}/images/family_picture.jpg`} 
                    alt="Family picture." 
                    className="about-photo"
                />

            </div>
                <p>This website is meant as an archive of recipes for our mother: Sarah Chen. 
                    She makes the most delicious recipes, and we want to keep her recipes in a 
                    centralized place we all have access to. Thank you so much to our amazing 
                    mother for always being so supportive and loving.</p>

                <p>She has a few words to say: </p>

                <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
                    <p>我们是相亲相爱的一家人。</p>
                    <p>We are a loving and close-knit family.</p>

                    <p>愿我们彼此守护，无论风雨如何变换，都能手牵手走过，让家成为每个人心灵的避风港。</p>
                    <p>May we protect each other, and no matter how the winds and rains change, may we walk hand in hand, making our home a safe haven for everyone's heart.</p>
                </div>
        </div>
    );
}

export default About;
