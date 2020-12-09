// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Backdrop } from '@material-ui/core';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

// define styles
const useStyles = makeStyles(theme => ({
	imageModal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.custom,
		boxShadow: theme.shadows[5],
		outline: 'none',
		borderRadius: '10px',
		color: '#fff',
		width: '90%'
	},
	carouselSlide: {
		height: '80vh',
		backgroundPosition: 'center',
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat'
	}
}));

// ModalImage Component
const ModalImage = props => {
	// styling classes
	const classes = useStyles();

	return (
		<div>
			<Modal
				className={classes.imageModal}
				aria-labelledby='register-modal-title'
				aria-describedby='register-modal-description'
				open={props.modalOpen}
				onClose={() => props.setModalOpen(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}
			>
				<motion.div
					className={classes.paper}
					transition={{
						duration: 0.6,
						type: 'spring',
						damping: 10,
						stiffness: 70
					}}
					initial={{ transform: 'scale(0)' }}
					animate={{ transform: 'scale(1)' }}
				>
					<Carousel className={classes.carousel} showThumbs={false}>
						{props.images.map((image, index) => {
							return (
								<div
									key={`slide-${index}`}
									className={classes.carouselSlide}
									style={{ backgroundImage: `url(/${image})` }}
								/>
							);
						})}
					</Carousel>
				</motion.div>
			</Modal>
		</div>
	);
};

// PropTypes
ModalImage.propTypes = {
	setModalOpen: PropTypes.func.isRequired,
	modalOpen: PropTypes.bool.isRequired,
	images: PropTypes.array.isRequired
};

// export ModalImage
export default ModalImage;
