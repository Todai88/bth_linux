/**
 * Main program to run the maze server
 *
 */
// jscs:disable
import maze from './maze';

var port = 1337;

maze.listen(port);

console.log('The maze server is now listening on: ' + port);
