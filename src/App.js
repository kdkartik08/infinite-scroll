import './App.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

//Importing Material UI stuff
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';


function App() {

  const useStyles = makeStyles((theme) => ({
    table: {
      width: 800,
      minWidth: '200px',
    },
    tcontainer: {
      backgroundColor: '#2c4250',
    },
    cellhead: {
      color: '#97a1ab',
      position: "sticky",
      top: 0
    },
    cellrow: {
      color: 'white',
    },
    gcontainer: {
      backgroundColor: '#394a5e',
    },

  }));

  const [images, setImages] = useState([]);
  const [state, setState] = useState({ pages: 1, limit: 20 });
  const pages = state.pages;
  const limit = state.limit;

  /*

  state = {
    images: [],
    pages: 1,
    limit: 20,
  };
  */

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    setState(prevState => { return { ...prevState, pages: prevState.pages + 1 } });
    axios
      .get(`https://picsum.photos/v2/list?page=${pages}&limit=${limit}`)
      .then(res =>
        setImages([...images, ...res.data])
      );
  };

  const classes = useStyles();

  return (
    <div className='wrapper'>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
      >
        <Grid container justify='center' className={classes.gcontainer}>
          <Grid item>
            <TableContainer className={classes.tcontainer}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.thead}>
                  <TableRow>
                    <TableCell className={classes.cellhead} >Photograph</TableCell>
                    <TableCell className={classes.cellhead} align="right">Author</TableCell>
                    <TableCell className={classes.cellhead} align="right">Width</TableCell>
                    <TableCell className={classes.cellhead} align="right">Height</TableCell>
                    <TableCell className={classes.cellhead} align="right">Post Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {images.map((image) => (
                    <TableRow key={image.id}>
                      <TableCell className='row'>
                        <img src={image.download_url} />
                      </TableCell>
                      <TableCell className={classes.cellrow} align="right">{image.author}</TableCell>
                      <TableCell className={classes.cellrow} align="right">{image.width}</TableCell>
                      <TableCell className={classes.cellrow} align="right">{image.height}</TableCell>
                      <TableCell className={classes.cellrow} align="right"><Link style={{color:'white'}} href={image.url} underline='none'>
                        Click here to view post</Link>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </InfiniteScroll>
    </div>
  );
}

export default App;





/////////////// class comp

/*

class App extends Component {

  state = {
    images: [],
    pages: 1,
    limit: 20,
  };

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = () => {
    const { pages, limit } = this.state;
    this.setState({ pages: this.state.pages + 1 });
    axios
      .get(`https://picsum.photos/v2/list?page=${pages}&limit=${limit}`)
      .then(res =>
        this.setState({ images: this.state.images.concat(res.data) })
      );
  };

  render() {

    return (
      <div className='wrapper'>
      <InfiniteScroll
          dataLength={this.state.images.length}
          next={this.fetchImages}
          hasMore={true}
        >

          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className='heading'>Photograph</TableCell>
                  <TableCell className='heading' align="right">Author</TableCell>
                  <TableCell className='heading' align="right">Width</TableCell>
                  <TableCell className='heading' align="right">Height</TableCell>
                  <TableCell className='heading' align="right">Post Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.images.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell  className='row'>
                      <img src={image.download_url}/>
                    </TableCell>
                    <TableCell  className='row' align="right">{image.author}</TableCell>
                    <TableCell  className='row' align="right">{image.width}</TableCell>
                    <TableCell  className='row' align="right">{image.height}</TableCell>
                    <TableCell  className='row' align="right"><a href={image.url}>Click here to view post</a></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </InfiniteScroll>
      </div>
    );
  }
}

export default App;

*/