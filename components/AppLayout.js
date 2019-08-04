import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {
    return (
        <div>
            <div>
                <Link href="/">
                    <a>myblog</a>
                </Link>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node
};

export default AppLayout;