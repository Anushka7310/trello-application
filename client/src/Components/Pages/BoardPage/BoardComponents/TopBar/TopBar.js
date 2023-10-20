import React, { useEffect, useState } from 'react';
import * as style from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { boardTitleUpdate } from '../../../../../Services/boardsService';


const TopBar = () => {
	const board = useSelector((state) => state.board);
	const [currentTitle, setCurrentTitle] = useState(board.title);
	const dispatch = useDispatch();
	useEffect(()=>{
		if(!board.loading)
			setCurrentTitle(board.title);
	},[board.loading, board.title]);
	const handleTitleChange = () => {
		boardTitleUpdate(currentTitle,board.id,dispatch);
	};
	return (
		<style.TopBar>
			<style.LeftWrapper>
				<style.BoardNameInput
					placeholder='Board Name'
					value={currentTitle}
					onChange={(e) => setCurrentTitle(e.target.value)}
					onBlur={handleTitleChange}
				/>
			</style.LeftWrapper>

		</style.TopBar>
	);
};

export default TopBar;
