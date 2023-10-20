import React, { useState } from 'react';
import EditCard from '../../../../Modals/EditCardModal/EditCard';
import DescriptiondIcon from '@mui/icons-material/DescriptionOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import {
	CardTitle,
	CommentContainer,
	Container,
	FooterContainer,
	IconGroupContainer,
	IconGroupWrapper,
	
	Span,
	
} from './styled';
import { Draggable } from 'react-beautiful-dnd';
const Card = (props) => {
	const [openModal, setOpenModal] = useState(false);
	const card = props.info;
	const comment = card.activities.filter((act) => act.isComment).length;

	const handleOpenClose = () => {
		setOpenModal((current) => !current);
	};


	return (
		<>
			<Draggable draggableId={props.info._id} index={props.index}>
				{(provided, snapshot) => {
					return (
						<Container
							onClick={handleOpenClose}
							{...provided.dragHandleProps}
							{...provided.draggableProps}
							ref={provided.innerRef}
							isDragging={snapshot.isDragging}
						>							

							<CardTitle>{card.title}</CardTitle>
							<FooterContainer>
								<IconGroupContainer>
									<IconGroupWrapper>
										
										{card.description && <DescriptiondIcon fontSize='0.5rem' />}
										{comment > 0 && (
											<CommentContainer>
												<CommentIcon fontSize='0.5rem' />
												<Span>{comment}</Span>
											</CommentContainer>
										)}
										
									</IconGroupWrapper>
								</IconGroupContainer>
								
							</FooterContainer>
						</Container>
					);
				}}
			</Draggable>
			{openModal && (
				<EditCard
					open={openModal}
					callback={handleOpenClose}
					ids={{ cardId: props.info._id, listId: props.listId, boardId: props.boardId }}
				/>
			)}
		</>
	);
};

export default Card;
