import BitMatrix from './BitMatrix';
import PerspectiveTransform from './PerspectiveTransform';
/**
 * Implementations of this class can, given locations of finder patterns for a QR code in an
 * image, sample the right points in the image to reconstruct the QR code, accounting for
 * perspective distortion. It is abstracted since it is relatively expensive and should be allowed
 * to take advantage of platform-specific optimized implementations, like Sun's Java Advanced
 * Imaging library, but which may not be available in other environments such as J2ME, and vice
 * versa.
 *
 * The implementation used can be controlled by calling {@link #setGridSampler(GridSampler)}
 * with an instance of a class which implements this interface.
 *
 * @author Sean Owen
 */
declare abstract class GridSampler {
    abstract sampleGrid(image: BitMatrix, dimensionX: number, dimensionY: number, p1ToX: number, p1ToY: number, p2ToX: number, p2ToY: number, p3ToX: number, p3ToY: number, p4ToX: number, p4ToY: number, p1FromX: number, p1FromY: number, p2FromX: number, p2FromY: number, p3FromX: number, p3FromY: number, p4FromX: number, p4FromY: number): BitMatrix;
    abstract sampleGridWithTransform(image: BitMatrix, dimensionX: number, dimensionY: number, transform: PerspectiveTransform): BitMatrix;
    /**
     * Checks a set of points that have been transformed to sample points on an image against
     * the image's dimensions to see if the points are even within the image.
     *
     * This method will actually "nudge" the endpoints back onto the image if they are found to be
     * barely (less than 1 pixel) off the image. This accounts for imperfect detection of finder
     * patterns in an image where the QR Code runs all the way to the image border.
     *
     * For efficiency, the method will check points from either end of the line until one is found
     * to be within the image. Because the set of points are assumed to be linear, this is valid.
     *
     * @param image image into which the points should map
     * @param points actual points in x1,y1,...,xn,yn form
     * @throws NotFoundException if an endpoint lies outside the image boundaries
     */
    protected static checkAndNudgePoints(image: BitMatrix, points: Float32Array): void;
}
export default GridSampler;
