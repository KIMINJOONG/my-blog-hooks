import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

const Home = () => {
    return (
        <div>
            <Link href="/join">
                <a>회원가입</a>
            </Link>
        </div>
    )
}

export default Home;