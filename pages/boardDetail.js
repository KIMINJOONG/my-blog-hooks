import React from 'react';
import { useSelector } from 'react-redux';
import { LOAD_BOARD_DETAIL_REQUEST } from '../reducers/board';

const boardDetail = ({}) => {
    const { boardDetail } = useSelector(state => state.board);


    return (
        <div>
            {
                boardDetail && (
                    <div>
                        <p>{boardDetail.title}</p>
                        <p>{boardDetail.content}</p>
                    </div>
                    
                )
            }
        </div>
    );
}

boardDetail.getInitialProps = async(context) => {
    context.store.dispatch({
        type: LOAD_BOARD_DETAIL_REQUEST,
        data: context.query.id
    });
    return { id: parseInt(context.query.id, 10)};
}
export default boardDetail;