import { describe, it, expect } from 'vitest';
import { generateAssignments } from './assignmentAlgorithm';
import type { Participant, PreAssignment } from '../types/assignment';

describe('assignmentAlgorithm', () => {
  describe('reciprocal pre-assignments', () => {
    it('should allow remaining participants to form reciprocal pairs when bidirectional pre-assignments exist', () => {
      const participants: Participant[] = [
        { id: 'a', name: 'Alice' },
        { id: 'b', name: 'Bob' },
        { id: 'c', name: 'Charlie' },
        { id: 'd', name: 'David' }
      ];

      const preAssignments: PreAssignment[] = [
        { id: 'pre1', giverId: 'a', receiverId: 'b' },
        { id: 'pre2', giverId: 'b', receiverId: 'a' }
      ];

      const result = generateAssignments(participants, preAssignments);

      expect(result.success).toBe(true);
      expect(result.assignments).toHaveLength(4);

      const assignmentMap = new Map(
        result.assignments.map(a => [a.giverId, a.receiverId])
      );

      expect(assignmentMap.get('a')).toBe('b');
      expect(assignmentMap.get('b')).toBe('a');
      expect(assignmentMap.get('c')).toBe('d');
      expect(assignmentMap.get('d')).toBe('c');
    });

    it('should work with 6 participants and one bidirectional pair', () => {
      const participants: Participant[] = [
        { id: 'a', name: 'Alice' },
        { id: 'b', name: 'Bob' },
        { id: 'c', name: 'Charlie' },
        { id: 'd', name: 'David' },
        { id: 'e', name: 'Eve' },
        { id: 'f', name: 'Frank' }
      ];

      const preAssignments: PreAssignment[] = [
        { id: 'pre1', giverId: 'a', receiverId: 'b' },
        { id: 'pre2', giverId: 'b', receiverId: 'a' }
      ];

      const result = generateAssignments(participants, preAssignments);

      expect(result.success).toBe(true);
      expect(result.assignments).toHaveLength(6);

      const assignmentMap = new Map(
        result.assignments.map(a => [a.giverId, a.receiverId])
      );

      expect(assignmentMap.get('a')).toBe('b');
      expect(assignmentMap.get('b')).toBe('a');

      expect(assignmentMap.size).toBe(6);
    });

    it('should prevent reciprocal pairs when NO bidirectional pre-assignments exist', () => {
      const participants: Participant[] = [
        { id: 'a', name: 'Alice' },
        { id: 'b', name: 'Bob' },
        { id: 'c', name: 'Charlie' }
      ];

      const preAssignments: PreAssignment[] = [];

      const result = generateAssignments(participants, preAssignments);

      expect(result.success).toBe(true);
      expect(result.assignments).toHaveLength(3);

      const assignmentMap = new Map(
        result.assignments.map(a => [a.giverId, a.receiverId])
      );

      for (const [giverId, receiverId] of assignmentMap) {
        const reverse = assignmentMap.get(receiverId);
        expect(reverse).not.toBe(giverId);
      }
    });
  });

  describe('basic constraints', () => {
    it('should require at least 3 participants', () => {
      const participants: Participant[] = [
        { id: 'a', name: 'Alice' },
        { id: 'b', name: 'Bob' }
      ];

      const result = generateAssignments(participants, []);

      expect(result.success).toBe(false);
      expect(result.error).toContain('at least 3');
    });

    it('should assign everyone exactly once as giver and receiver', () => {
      const participants: Participant[] = [
        { id: 'a', name: 'Alice' },
        { id: 'b', name: 'Bob' },
        { id: 'c', name: 'Charlie' },
        { id: 'd', name: 'David' },
        { id: 'e', name: 'Eve' }
      ];

      const result = generateAssignments(participants, []);

      expect(result.success).toBe(true);
      expect(result.assignments).toHaveLength(5);

      const givers = new Set(result.assignments.map(a => a.giverId));
      const receivers = new Set(result.assignments.map(a => a.receiverId));

      expect(givers.size).toBe(5);
      expect(receivers.size).toBe(5);
    });
  });
});
