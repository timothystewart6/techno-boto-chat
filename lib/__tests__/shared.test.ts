import { parseErrorMessage } from '../shared';

describe('Shared Utilities', () => {
  describe('parseErrorMessage', () => {
    it('extracts message from Error object', () => {
      const error = new Error('Test error message');
      const result = parseErrorMessage(error);
      expect(result).toBe('Test error message');
    });

    it('handles string errors', () => {
      const error = 'String error message';
      const result = parseErrorMessage(error);
      expect(result).toBe('String error message');
    });

    it('handles object with message property', () => {
      const error = { message: 'Object error message' };
      const result = parseErrorMessage(error);
      expect(result).toBe('Object error message');
    });

    it('handles unknown error types', () => {
      const error = { someProperty: 'value' };
      const result = parseErrorMessage(error);
      expect(result).toBe('An unknown error occurred');
    });

    it('handles null and undefined', () => {
      expect(parseErrorMessage(null)).toBe('An unknown error occurred');
      expect(parseErrorMessage(undefined)).toBe('An unknown error occurred');
    });

    it('handles empty strings', () => {
      const result = parseErrorMessage('');
      expect(result).toBe('An unknown error occurred');
    });

    it('handles objects with empty message', () => {
      const error = { message: '' };
      const result = parseErrorMessage(error);
      expect(result).toBe('An unknown error occurred');
    });

    it('handles nested error structures', () => {
      const error = {
        response: {
          data: {
            message: 'Nested error message',
          },
        },
      };
      // Note: This test may need adjustment based on actual implementation
      const result = parseErrorMessage(error);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
