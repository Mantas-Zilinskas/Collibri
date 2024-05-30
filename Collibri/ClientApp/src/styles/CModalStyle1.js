export const CModalStyle1 = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    p: 2,
    bgcolor: '#DEFEF5',
    borderRadius: 2,
    border: '2px solid #000',
    borderColor: '#3f5c4b',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    //marginTop: "5%"
    display: 'flex',
    flexDirection: 'row'
  },
  buttons: {
    color: '#316C44',
    backgroundColor: '#B9F5D9',
    margin: '2%',
    borderRadius: 3,
  },
  text: {
    fontFamily: 'Segoe UI semibold'
  },
  alert: {
    position: 'fixed',
    //transform: 'translate(30vw, -15vh)',
    top: '2%',
    right: '44%',
    borderRadius: 2,
    backgroundColor: '#80CB9E',
    color: '#DEFEF5'
  }
};